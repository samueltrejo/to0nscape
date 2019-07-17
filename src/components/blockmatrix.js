import React from 'react';
import $ from 'jquery';

class BlockMatrix extends React.Component {
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

  generateObstacles = () => {
    const obstacles = [];
    const amountObstacles = this.gameDefaultValues.gameScreenWidth / 32;
    const obstaclePos = parseFloat(32 / this.gameDefaultValues.gameScreenWidth).toFixed(2);
    // return { amountObstacles, obstacleWidth };

    for (let i = 0; i < amountObstacles; i += 1) {
      $(`#obstacle${i}`).css('left', `${obstaclePos * i}%`);
      obstacles.push(<div id={`obstacle${i}`} className="obstacle bg-info position-absolute"></div>);
    }

    return obstacles;
  }

  componentDidMount() {
    this.gameDefaultValues = {
      gameScreenWidth: 0,
      playerPos: 0,
      moveStateLeft: false,
      moveStateRight: false,
      amountObstacles: 0,
      obstacleWidth: '',
    };

    this.getDefaultValues();
    // this.generateObstacles();

    this.movePlayerInterval = setInterval(this.updatePlayerPos, 10);
    $('body').on('keydown', this.movePlayer);
    $('body').on('keyup', this.stopPlayer);
  }

  componentWillUnmount() {
    clearInterval(this.movePlayerInterval);
    $('body').off('keydown', this.movePlayer);
    $('body').off('keyup', this.stopPlayer);
  }

  render() {
    return (
      <div className="BlockMatrix p-5 vh-100">
        <div className="game-screen h-100 bg-dark position-relative">
          <div className="obstacle bg-info position-absolute"></div>
          <div className="obstacle bg-info position-absolute"></div>
          <div className="obstacle bg-info position-absolute"></div>
          <div className="obstacle bg-info position-absolute"></div>
          <div className="obstacle bg-info position-absolute"></div>
          <div className="obstacle bg-info position-absolute"></div>
          <div className="obstacle bg-info position-absolute"></div>
          <div className="obstacle bg-info position-absolute"></div>
          <div className="obstacle bg-info position-absolute"></div>
          <div className="obstacle bg-info position-absolute"></div>

          <div className="player bg-white position-absolute"></div>
        </div>
      </div>
    );
  }
}

export default BlockMatrix;
