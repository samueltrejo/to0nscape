import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

import profileData from '../helpers/data/profile-data';
import scoresData from '../helpers/data/scores-data';
import lobbiesData from '../helpers/data/lobbies-data';

class BlockMatrixMultiplayer extends React.Component {
  state = {
    obstacles: [],
    lobby: {},
  }

  // GAME PREPARATION

  getLobby = () => {
    lobbiesData.getLobby(this.props.match.params.lobby)
      .then((lobby) => {
        this.setState({ lobby: lobby.data });
      })
      .catch(error => console.error(error));
  }

  multiplayerLobbyQueue = () => {
    
  }

  startGame = () => {
    this.gameDefaultValues = {
      gameScreenWidth: 0,
      playerPos: 0,
      moveStateLeft: false,
      moveStateRight: false,
      obstacleIds: [],
      score: 0,
      obstacleDropSpeed: 10,
      playerMovementSpeed: 1,
      movePlayerIntervalSpeed: 10,
      launchObstaclesIntervalSpeed: 100,
    };

    this.getDefaultValues();
    this.generateObstacles(64);
    this.detectScreenResize();

    $('body').on('keydown', this.movePlayer);
    $('body').on('keyup', this.stopPlayer);

    this.movePlayerInterval = setInterval(this.updatePlayerPos, this.gameDefaultValues.movePlayerIntervalSpeed);
    this.setObstaclesInterval = setInterval(this.launchObstacles, this.gameDefaultValues.launchObstaclesIntervalSpeed);
    this.setScoreInterval = setInterval(this.updateScore, 1000);
    this.difficultyInterval = setInterval(this.increaseDifficulty, 1000);
  }

  launchGame = () => {
    $('.announcer').fadeIn();
    $('.announcer').html('3');
    setTimeout(() => $('.announcer').html('2'), 1000);
    setTimeout(() => $('.announcer').html('1'), 2000);
    setTimeout(() => {
      $('.announcer').html('GO');
      $('.announcer').fadeOut();
      this.startGame();
    }, 3000);
  }

  gameOver = () => {
    clearInterval(this.movePlayerInterval);
    clearInterval(this.setObstaclesInterval);
    clearInterval(this.setScoreInterval);
    clearInterval(this.difficultyInterval);
    $('body').off('keydown', this.movePlayer);
    $('body').off('keyup', this.stopPlayer);
    $(window).off('resize', this.gameOver);

    this.endGameScreen();
    $('.announcer').fadeIn();
  }

  endGameScreen = () => {
    let endGameInfo = '<div>You Lose!</div><div class="d-flex">';
    endGameInfo += '<button class="to-start btn btn-outline-light ml-auto mr-3">Back</button>';
    endGameInfo += '<button class="save-score btn btn-outline-light mr-3">Save and View Score</button>';
    endGameInfo += '<button class="retry btn btn-outline-light">Try Again</button></div>';
    $('.announcer').html(endGameInfo);
    $('.to-start').off('click', this.toStart);
    $('.save-score').off('click', this.saveScore);
    $('.retry').off('click', this.launchGame);
    $('.to-start').on('click', this.toStart);
    $('.save-score').on('click', this.saveScore);
    $('.retry').on('click', this.launchGame);
  }

  getDefaultValues = () => {
    const gameScreenWidth = parseInt($('.game-screen').width(), 10);
    const playerPos = gameScreenWidth / 2;
    this.gameDefaultValues.gameScreenWidth = gameScreenWidth;
    this.gameDefaultValues.playerPos = playerPos;
  }

  increaseDifficulty = () => {
    // this.gameDefaultValues.obstacleDropSpeed = 10;
    let os = this.gameDefaultValues.obstacleDropSpeed;
    // this.gameDefaultValues.playerMovementSpeed = 1;
    let ps = this.gameDefaultValues.playerMovementSpeed;
    // this.gameDefaultValues.movePlayerIntervalSpeed = 10;
    // this.gameDefaultValues.launchObstaclesIntervalSpeed = 100;
    if (os >= 1) {
      os -= 0.1;
    }
    if (ps <= 7) {
      ps += 0.07;
    }
    console.error('os', os, 'ps', ps, 'sw', this.gameDefaultValues.gameScreenWidth);
    this.gameDefaultValues.obstacleDropSpeed = os;
    this.gameDefaultValues.playerMovementSpeed = ps;
  }

  toStart = () => {
    this.props.history.push('/blockmatrix-startscreen');
  }

  // PLAYER MOVEMENT

  updatePlayerPos = () => {
    let { playerPos } = this.gameDefaultValues;
    const { moveStateLeft, moveStateRight, gameScreenWidth } = this.gameDefaultValues;

    if (moveStateRight && playerPos < gameScreenWidth - 19) {
      playerPos += this.gameDefaultValues.playerMovementSpeed;
      this.gameDefaultValues.playerPos = playerPos;
    }
    if (moveStateLeft && playerPos > 0) {
      playerPos -= this.gameDefaultValues.playerMovementSpeed;
      this.gameDefaultValues.playerPos = playerPos;
    }

    this.collisionCheck();
    $('.player').css('left', `${playerPos}px`);
  };

  movePlayer = (event) => {
    const { keyCode } = event;
    if (keyCode === 37) {
      this.gameDefaultValues.moveStateLeft = true;
    } else if (keyCode === 39) {
      this.gameDefaultValues.moveStateRight = true;
    }
  }

  stopPlayer = (event) => {
    const { keyCode } = event;
    if (keyCode === 37) {
      this.gameDefaultValues.moveStateLeft = false;
    } else if (keyCode === 39) {
      this.gameDefaultValues.moveStateRight = false;
    }
  }

  // OBSTACLE GENERATION

  generateObstacles = (width) => {
    const obstacles = [];
    const obstacleIds = [];
    const amountObstacles = this.gameDefaultValues.gameScreenWidth / width;

    for (let i = 0; i < amountObstacles; i += 1) {
      const obstacleId = `obstacle${i}`;
      const obstacleCSS = {
        left: `${parseFloat(width * i).toFixed(2)}px`,
        width,
      };
      obstacles.push(<div key={obstacleId} id={obstacleId} className="obstacle bg-info position-absolute" style={obstacleCSS}></div>);
      obstacleIds.push(`#${obstacleId}`);
    }

    this.gameDefaultValues.obstacleIds = obstacleIds;
    this.setState({ obstacles: [] });
    this.setState({ obstacles });
  }

  randomObstacle = () => {
    const randomNum = Math.floor(Math.random() * this.gameDefaultValues.obstacleIds.length);
    const obstacle = this.gameDefaultValues.obstacleIds[randomNum];
    return obstacle;
  }

  dropObstacle = (obstacle) => {
    const obstaclePos = parseInt($(obstacle).css('top'), 10);
    const border = parseInt($('.border').css('top'), 10) + 16;
    if (obstaclePos === -16 || obstaclePos >= border) {
      for (let i = 0; i <= border; i += 1) {
        setTimeout(() => {
          $(obstacle).css('top', `${i}px`);
        }, this.gameDefaultValues.obstacleDropSpeed * i);
        if (i >= border) {
          setTimeout(() => {
            $(obstacle).css('top', '-16px');
          }, this.gameDefaultValues.obstacleDropSpeed * i);
        }
      }
    }
  }

  launchObstacles = () => {
    const obstacle = this.randomObstacle();
    this.dropObstacle(obstacle);
  };

  // COLLISION DETECTION

  getDimensions = (target) => {
    const dimensions = {
      lx: $(target).position().left,
      ty: $(target).position().top,
      rx: $(target).position().left + $(target).width(),
      by: $(target).position().top + $(target).height(),
    };
    return dimensions;
  };

  collisionCheck = () => {
    const player = this.getDimensions('.player');
    this.gameDefaultValues.obstacleIds.forEach((obstacleId) => {
      const obstacle = this.getDimensions(obstacleId);
      if (player.lx < obstacle.rx && player.rx > obstacle.lx && player.ty < obstacle.by && player.by > obstacle.ty) {
        this.gameOver();
      }
    });
  }

  // SCORING SYSTEM

  updateScore = () => {
    this.gameDefaultValues.score += 1;
    $('.score').text(this.gameDefaultValues.score);
  }

  saveScore = () => {
    $('.save-score').off('click', this.saveScore);
    $('.retry').off('click', this.launchGame);
    profileData.getMyProfile(firebase.auth().currentUser.uid)
      .then((profile) => {
        const score = {
          score: this.gameDefaultValues.score,
          game: 'Block Matrix',
          username: profile.username,
        };
        scoresData.postScore(score)
          .then(() => this.props.history.push('/leaderboards'));
      })
      .catch(error => console.error(error));
  }

  // ANTI CHEAT

  detectScreenResize = () => {
    $(window).on('resize', this.gameOver);
  }

  componentDidMount() {
    // this.launchGame();
    this.getLobby();
  }

  componentWillUnmount() {
    this.gameOver();
  }

  render() {
    return (
      <div className="BlockMatrix p-5 vh-100">
        <div className="game-screen h-100 bg-dark position-relative overflow-hidden">
          <div className="border bg-info position-absolute"></div>
          {this.state.obstacles}

          <div className="player bg-white position-absolute"></div>
          <div className="p-3 text-white position-absolute">Score: <span className="score">0</span></div>
          <div className="h-100 d-flex justify-content-center align-items-center"><div className="announcer display-1 text-white"></div></div>
          <div className="h-100 d-flex justify-content-center align-items-center">
            <div className="lobby-queue display-1 text-white">

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BlockMatrixMultiplayer;