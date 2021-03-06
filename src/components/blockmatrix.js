import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

import profileData from '../helpers/data/profile-data';
import scoresData from '../helpers/data/scores-data';

import beholder from '../images/beholder.svg';
import bipolarbear from '../images/bipolarbear.svg';
import biteybat from '../images/biteybat.svg';
import burlybear from '../images/burlybear.svg';
import cardinal from '../images/cardinal.svg';
import chicken from '../images/chicken.svg';
import dragonhead from '../images/dragonhead.svg';
import frogglet from '../images/frogglet.svg';
import giraffey from '../images/giraffey.svg';
import goldenwhale from '../images/golden-whale.svg';
import hawkster from '../images/hawkster.svg';
import installball from '../images/installball.svg';
import meowburt from '../images/meowburt.svg';
import monkeyface from '../images/monkeyface.svg';
import mrbuddy from '../images/mrbuddy.svg';
import owlet from '../images/owlet.svg';
import pazzo from '../images/pazzo.svg';
import pelter from '../images/pelter.svg';
import piggy from '../images/piggy.svg';
import rammy from '../images/rammy.svg';
import scratchpaw from '../images/scratchpaw.svg';
import seahorse from '../images/seahorse.svg';
import sherbert from '../images/sherbert.svg';
import snailburt from '../images/snailburt.svg';
import snoot from '../images/snoot.svg';
import spiny from '../images/spiny.svg';
import troll from '../images/troll.svg';
import yeti from '../images/yeti.svg';
import zebra from '../images/zebra.svg';

class BlockMatrix extends React.Component {
  state = {
    obstacles: [],
    profile: {},
  }

  // GAME PREPARATION

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

  // REACT STUFF

  getMyProfile = () => {
    if (this.props.authed) {
      const { uid } = firebase.auth().currentUser;
      profileData.getMyProfile(uid)
        .then((profile) => {
          this.setState({ profile });
          setTimeout(() => this.setState({ loaded: true }), 1000);
        })
        .catch(error => console.error(error));
    }
  }

  componentDidMount() {
    this.getMyProfile();
    this.launchGame();
  }

  componentWillUnmount() {
    this.gameOver();
  }

  render() {
    const { profile } = this.state;
    const avatarImages = {
      beholder,
      bipolarbear,
      biteybat,
      burlybear,
      cardinal,
      chicken,
      dragonhead,
      frogglet,
      giraffey,
      goldenwhale,
      hawkster,
      installball,
      meowburt,
      monkeyface,
      mrbuddy,
      owlet,
      pazzo,
      pelter,
      piggy,
      rammy,
      scratchpaw,
      seahorse,
      sherbert,
      snailburt,
      snoot,
      spiny,
      troll,
      yeti,
      zebra,
    };
    return (
      <div className="BlockMatrix p-5 vh-100">
        <div className="game-screen h-100 bg-dark position-relative overflow-hidden">
          <div className="border bg-info position-absolute"></div>
          {this.state.obstacles}

          <div className="player position-absolute text-white" style={{ backgroundImage: `url(${avatarImages[profile.avatar]})`, backgroundPosition: 'center top', backgroundSize: 'cover' }}></div>
          <div className="p-3 text-white position-absolute">Score: <span className="score">0</span></div>
          <div className="h-100 d-flex justify-content-center align-items-center"><div className="announcer display-1 text-white">3</div></div>
        </div>
      </div>
    );
  }
}

export default BlockMatrix;
