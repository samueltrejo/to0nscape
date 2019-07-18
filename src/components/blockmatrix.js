import React from 'react';
import $ from 'jquery';

class BlockMatrix extends React.Component {
  state = {
    obstacles: [],
  }

  getDefaultValues = () => {
    const gameScreenWidth = parseInt($('.game-screen').width(), 10);
    const playerPos = gameScreenWidth / 2;
    this.gameDefaultValues.gameScreenWidth = gameScreenWidth;
    this.gameDefaultValues.playerPos = playerPos;
  }

  gameOver = () => {
    console.error('game over');
  }

  getDimensions = (target) => {
    const dimensions = {
      lx: $(target).position().left,
      ty: $(target).position().top,
      rx: $(target).position().left + $(target).width(),
      by: $(target).position().top + $(target).height(),
    };
    // console.error(target, dimensions)
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

  randomObstacle = () => {
    const randomNum = Math.floor(Math.random() * this.gameDefaultValues.obstacleIds.length);
    const obstacle = this.gameDefaultValues.obstacleIds[randomNum];
    return obstacle;
  }

  dropObject = (obstacle) => {
    const obstaclePos = parseInt($(obstacle).css('top'), 10);
    const border = parseInt($('.border').css('top'), 10) + 16;
    console.error(obstaclePos, border);
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
    this.dropObject(obstacle);
  };

  componentDidMount() {
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
    this.setScoreInterval = setInterval(() => { this.gameDefaultValues.score += 1; });
  }

  componentWillUnmount() {
    clearInterval(this.movePlayerInterval);
    clearInterval(this.setObstaclesInterval);
    $('body').off('keydown', this.movePlayer);
    $('body').off('keyup', this.stopPlayer);
  }

  render() {
    return (
      <div className="BlockMatrix p-5 vh-100">
        <div className="game-screen h-100 bg-dark position-relative overflow-hidden">
          <div className="border bg-info position-absolute"></div>
          {this.state.obstacles}

          <div className="player bg-white position-absolute"></div>
          <div className="p-3 text-white">Score: <span className="score">0</span></div>
        </div>
      </div>
    );
  }
}

export default BlockMatrix;
