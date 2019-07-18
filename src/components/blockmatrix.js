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
    console.error(target, dimensions)
    return dimensions;
  };

  collisionCheck = () => {
    const pd = this.getDimensions('.player');
    this.gameDefaultValues.obstacleIds.forEach((obstacleId) => {
      const od = this.getDimensions(obstacleId);
      if (pd.lx < od.rx && pd.ty < od.by && pd.by > od.ty) {
        console.error('game over');
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

  generateObstacles = () => {
    const obstacles = [];
    const obstacleIds = [];
    const amountObstacles = this.gameDefaultValues.gameScreenWidth / 128;

    for (let i = 0; i < amountObstacles; i += 1) {
      const obstacleId = `obstacle${i}`;
      obstacles.push(
        <div key={obstacleId} className="h-16 w-100 position-relative">
          <div id={obstacleId} className="obstacle w-100 bg-info position-absolute"></div>
        </div>,
      );
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
    // console.error(obstaclePos, border);
    if (obstaclePos === 0 || obstaclePos >= border) {
      for (let i = 0; i <= border; i += 1) {
        setTimeout(() => {
          $(obstacle).css('top', `${i}px`);
        }, 2 * i);
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
    };

    this.getDefaultValues();
    this.generateObstacles();

    $('body').on('keydown', this.movePlayer);
    $('body').on('keyup', this.stopPlayer);

    this.movePlayerInterval = setInterval(this.updatePlayerPos, 10);
    this.setObstaclesInterval = setInterval(this.launchObstacles, 100);
  }

  componentWillUnmount() {
    clearInterval(this.movePlayerInterval);
    $('body').off('keydown', this.movePlayer);
    $('body').off('keyup', this.stopPlayer);
  }

  render() {
    return (
      <div className="BlockMatrix p-5 vh-100">
        <div className="game-screen h-100 bg-dark position-relative overflow-hidden">
          <div className="border obstacle bg-info position-absolute"></div>

          <div className="obstacles-container w-100 d-flex position-absolute">
            {this.state.obstacles}
          </div>

          <div className="player bg-white position-absolute"></div>
        </div>
      </div>
    );
  }
}

export default BlockMatrix;
