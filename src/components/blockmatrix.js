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

  setObstaclePos = (event) => {
    const obstaclePos = event.target.dataset.value;
    console.error(obstaclePos);
  }

  generateObstacles = () => {
    const obstacles = [];
    const obstacleIds = [];
    const amountObstacles = this.gameDefaultValues.gameScreenWidth / 32;

    for (let i = 0; i < amountObstacles; i += 1) {
      const obstacleId = `obstacle${i}`;
      obstacles.push(
        <div key={obstacleId} className="h-16 w-100 position-relative">
          <div id={obstacleId} className="obstacle w-100 bg-info position-absolute"></div>
        </div>,
      );
      obstacleIds.push(obstacleId);
    }

    this.gameDefaultValues.obstacleIds = obstacleIds;
    this.setState({ obstacles });
  }

  randomObstacle = () => {
    const randomNum = Math.floor(Math.random() * this.gameDefaultValues.obstacleIds.length);
    const obstacle = this.gameDefaultValues.obstacleIds[randomNum];
    return obstacle;
  }

  dropObject = (object) => {
    const obstaclePos = $(`#${object}`).css('top');
    const border = $('.border').css('top');
    console.error(obstaclePos, parseInt(border, 10) + 16);
    if (obstaclePos === '0px' || obstaclePos === `${parseInt(border, 10) + 16}px`) {
      for (let i = 0; i <= (parseInt(border, 10) + 16); i += 1) {
        setTimeout(() => {
          $(`#${object}`).css('top', `${i}px`);
        }, 5 * i);
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
        {console.error('test')}
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
