import React from 'react';
import $ from 'jquery';

class BlockMatrix extends React.Component {
  state = {
    obstacles: [],
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
    };

    this.getDefaultValues();
    this.generateObstacles(64);

    $('body').on('keydown', this.movePlayer);
    $('body').on('keyup', this.stopPlayer);

    this.movePlayerInterval = setInterval(this.updatePlayerPos, 10);
    this.setObstaclesInterval = setInterval(this.launchObstacles, 100);
    this.setScoreInterval = setInterval(this.updateScore, 1000);
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
    $('body').off('keydown', this.movePlayer);
    $('body').off('keyup', this.stopPlayer);

    this.endGameScreen();
    $('.announcer').fadeIn();
  }

  endGameScreen = () => {
    const endGameInfo = '<div>You Lose!</div><div class="d-flex"><button class="save-score btn btn-outline-light ml-auto mr-3">Save Your Score</button><button class="retry btn btn-outline-light">Try Again</button></div>';
    $('.announcer').html(endGameInfo);
    $('.save-score').off('click', this.saveScore);
    $('.retry').off('click', this.launchGame);
    $('.save-score').on('click', this.saveScore);
    $('.retry').on('click', this.launchGame);
  }

  getDefaultValues = () => {
    const gameScreenWidth = parseInt($('.game-screen').width(), 10);
    const playerPos = gameScreenWidth / 2;
    this.gameDefaultValues.gameScreenWidth = gameScreenWidth;
    this.gameDefaultValues.playerPos = playerPos;
  }

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
      obstacles.push(<div id={obstacleId} className="obstacle bg-info position-absolute" style={obstacleCSS}></div>);
      obstacleIds.push(`#${obstacleId}`);
    }

    this.gameDefaultValues.obstacleIds = obstacleIds;
    this.setState({ obstacles });
  }

  // PLAYER MOVEMENT

  updatePlayerPos = () => {
    let { playerPos } = this.gameDefaultValues;
    if (this.gameDefaultValues.moveStateRight) {
      playerPos += 5;
      this.gameDefaultValues.playerPos = playerPos;
    }
    if (this.gameDefaultValues.moveStateLeft) {
      playerPos -= 5;
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
        }, 10 * i);
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
    const { score } = this.gameDefaultValues;
    console.error(score);
  }

  componentDidMount() {
    this.launchGame();
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
          <div className="h-100 d-flex justify-content-center align-items-center"><div className="announcer display-1 text-white">3</div></div>
        </div>
      </div>
    );
  }
}

export default BlockMatrix;
