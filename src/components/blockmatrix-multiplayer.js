import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import $ from 'jquery';

import profileData from '../helpers/data/profile-data';
import lobbiesData from '../helpers/data/lobbies-data';

class BlockMatrixMultiplayer extends React.Component {
  state = {
    obstacles: [],
    lobby: {
      player1: '',
      player1Ready: false,
      player2: '',
      player2Ready: false,
      lobbyCode: '',
    },
    player: '',
    profile: {},
  }

  // MULTIPLAYER LOBBY

  changePlayer1Status = () => {
    const { lobby, player } = this.state;
    if (player === 'player1' && this.lobbyId !== undefined) {
      if (lobby.player1Ready) {
        lobby.player1Ready = false;
      } else {
        lobby.player1Ready = true;
      }
      lobbiesData.updateLobby(lobby, this.lobbyId);
    }
  }

  changePlayer2Status = () => {
    const { lobby, player } = this.state;
    if (player === 'player2' && this.lobbyId !== undefined) {
      if (lobby.player2Ready) {
        lobby.player2Ready = false;
      } else {
        lobby.player2Ready = true;
      }
      lobbiesData.updateLobby(lobby, this.lobbyId);
    }
  }

  checkIfPlayersReady = () => {
    const { lobby } = this.state;
    if (lobby.player1Ready && lobby.player2Ready) {
      firebase.database().ref(`lobbies/${this.lobbyId}`).off('value', this.getLobby);
      this.launchGame();
    }
  }

  getLobby = (data) => {
    const lobby = data.val();
    this.setState({ lobby });
    this.checkIfPlayersReady();
  }

  destroyLobby = () => {
    lobbiesData.deleteLobby(this.lobbyId);
  }

  catchError = (error) => {
    console.error(error);
  };

  initLobby = () => {
    $('.announcer').hide();
    const { uid } = firebase.auth().currentUser;
    profileData.getMyProfile(uid)
      .then((profile) => {
        this.setState({ profile });

        lobbiesData.getLobby(this.props.match.params.lobby)
          .then((lobby) => {
            const lobbyCopy = lobby;
            if (lobby.player1 === profile.username) {
              this.setState({ player: 'player1' });
              lobbyCopy.player1Present = true;
            } else if (lobby.player2 === '' || lobby.player2 === profile.username) {
              lobbyCopy.player2 = profile.username;
              this.setState({ player: 'player2' });
              lobbyCopy.player1Present = true;
            }
            this.lobbyId = lobby.id;
            delete lobbyCopy.id;
            firebase.database().ref(`lobbies/${this.lobbyId}`).on('value', this.getLobby, this.catchError);
            lobbiesData.updateLobby(lobbyCopy, this.lobbyId);
          });
      })
      .catch(error => console.error(error));
  }

  // GAME PREPARATION

  launchGame = () => {
    $('.lobby-queue').hide();
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

  gameOver = (playerColor) => {
    clearInterval(this.movePlayerInterval);
    clearInterval(this.setObstaclesInterval);
    $('body').off('keydown', this.movePlayer);
    $('body').off('keyup', this.stopPlayer);

    this.endGameScreen(playerColor);
    $('.announcer').fadeIn();
  }

  endGameScreen = (playerColor) => {
    let endGameInfo = `<div>${playerColor} Player Loses!</div><div class="d-flex">`;
    endGameInfo += '<button class="to-start btn btn-outline-light ml-auto mr-3">Back</button>';
    endGameInfo += '<button class="retry btn btn-outline-light">Try Again</button></div>';
    $('.announcer').html(endGameInfo);
    $('.to-start').off('click', this.toStart);
    $('.retry').off('click', this.launchGame);
    $('.to-start').on('click', this.toStart);
    $('.retry').on('click', this.launchGame);
    firebase.database().ref(`lobbies/${this.lobbyId}`).off('value', this.updatePlayer);
    firebase.database().ref(`lobbies/${this.lobbyId}/obstacle`).off('value', this.updateObstacles);
  }

  toStart = () => {
    this.props.history.push('/blockmatrix-startscreen');
  }

  startGame = () => {
    this.lobby = this.state.lobby;
    this.lobby.player1Pos = 0;
    this.lobby.player2Pos = 0;
    this.lobby.obstacle = '';

    delete this.lobby.id;

    this.gameDefaultValues = {
      gameScreenWidth: 0,
      movePlayerIntervalSpeed: 25,
      launchObstaclesIntervalSpeed: 1000,
      playerMovementSpeed: 5,
      obstacleDropSpeed: 25,
      obstacleSpeed: 10,
      previousObstacle: '',
      player1Left: false,
      player1Right: false,
      player2Left: false,
      player2Right: false,
      obstacleIds: ['obstacle1', 'obstacle2', 'obstacle3', 'obstacle4', 'obstacle5', 'obstacle6', 'obstacle7', 'obstacle8', 'obstacle9', 'obstacle10',
        'obstacle11', 'obstacle12', 'obstacle13', 'obstacle14', 'obstacle15', 'obstacle16', 'obstacle17', 'obstacle18', 'obstacle19', 'obstacle20'],
    };

    this.getDefaultValues();

    $('body').on('keydown', this.movePlayer);
    $('body').on('keyup', this.stopPlayer);

    firebase.database().ref(`lobbies/${this.lobbyId}`).on('value', this.updatePlayer, this.catchError);
    firebase.database().ref(`lobbies/${this.lobbyId}/obstacle`).on('value', this.updateObstacles, this.catchError);
    this.movePlayerInterval = setInterval(this.updatePlayerPos, this.gameDefaultValues.movePlayerIntervalSpeed);
    this.setObstaclesInterval = setInterval(this.launchObstacles, this.gameDefaultValues.launchObstaclesIntervalSpeed);
  }

  getDefaultValues = () => {
    const gameScreenWidth = parseInt($('.game-screen').width(), 10);
    const player1Pos = (gameScreenWidth / 4);
    const player2Pos = (gameScreenWidth / 4) * 3;
    this.gameDefaultValues.gameScreenWidth = gameScreenWidth;
    this.lobby.player1Pos = player1Pos;
    this.lobby.player2Pos = player2Pos;
  }

  // PLAYER MOVEMENT

  updatePlayer = (data) => {
    if (this.state.player === 'player1') {
      this.lobby.player2Pos = data.val().player2Pos;
    }
    if (this.state.player === 'player2') {
      this.lobby.player1Pos = data.val().player1Pos;
    }
    $('.player1').css('left', `${data.val().player1Pos}px`);
    $('.player2').css('left', `${data.val().player2Pos}px`);
  }

  updatePlayerPos = () => {
    const { player } = this.state;
    let { player1Pos, player2Pos } = this.lobby;
    const {
      player1Left,
      player1Right,
      player2Left,
      player2Right,
      gameScreenWidth,
      playerMovementSpeed,
    } = this.gameDefaultValues;

    if (player === 'player1' && player1Left && player1Pos > 0) {
      player1Pos -= playerMovementSpeed;
    }
    if (player === 'player1' && player1Right && player1Pos < gameScreenWidth - 19 && player1Pos < player2Pos - 16) {
      player1Pos += playerMovementSpeed;
    }
    if (player === 'player2' && player2Left && player2Pos > 0 && player2Pos > player1Pos + 16) {
      player2Pos -= playerMovementSpeed;
    }
    if (player === 'player2' && player2Right && player2Pos < gameScreenWidth - 19) {
      player2Pos += playerMovementSpeed;
    }
    this.collisionCheck();
    if (player === 'player1' && this.lobbyId !== undefined) {
      this.lobby.player1Pos = player1Pos;
      lobbiesData.updateLobbyP1(this.lobby.player1Pos, this.lobbyId);
    }
    if (player === 'player2' && this.lobbyId !== undefined) {
      this.lobby.player2Pos = player2Pos;
      lobbiesData.updateLobbyP2(this.lobby.player2Pos, this.lobbyId);
    }
  };

  movePlayer = (event) => {
    const { player } = this.state;
    const { keyCode } = event;

    if (player === 'player1' && keyCode === 37) {
      this.gameDefaultValues.player1Left = true;
    } else if (player === 'player1' && keyCode === 39) {
      this.gameDefaultValues.player1Right = true;
    }

    if (player === 'player2' && keyCode === 37) {
      this.gameDefaultValues.player2Left = true;
    } else if (player === 'player2' && keyCode === 39) {
      this.gameDefaultValues.player2Right = true;
    }
  }

  stopPlayer = (event) => {
    const { player } = this.state;
    const { keyCode } = event;

    if (player === 'player1' && keyCode === 37) {
      this.gameDefaultValues.player1Left = false;
    } else if (player === 'player1' && keyCode === 39) {
      this.gameDefaultValues.player1Right = false;
    }

    if (player === 'player2' && keyCode === 37) {
      this.gameDefaultValues.player2Left = false;
    } else if (player === 'player2' && keyCode === 39) {
      this.gameDefaultValues.player2Right = false;
    }
  }

  // OBSTACLE GENERATION

  updateObstacles = (data) => {
    this.dropObstacle(data.val());
  }

  randomObstacle = () => {
    const randomNum = Math.floor(Math.random() * 20);
    const obstacle = this.gameDefaultValues.obstacleIds[randomNum];
    return obstacle;
  }

  dropObstacle = (obstacle) => {
    const border = parseInt($('.border').css('top'), 10) + 16;
    for (let i = 0; i <= border; i += this.gameDefaultValues.obstacleSpeed) {
      setTimeout(() => {
        $(`.${obstacle}`).css('top', `${i}px`);
      }, this.gameDefaultValues.obstacleDropSpeed * i);
      if (i >= border - this.gameDefaultValues.obstacleSpeed) {
        setTimeout(() => {
          $(`.${obstacle}`).css('top', '-16px');
        }, this.gameDefaultValues.obstacleDropSpeed * i);
      }
    }
  }

  launchObstacles = () => {
    const obstacle = this.randomObstacle();
    if (this.gameDefaultValues.previousObstacle !== obstacle && this.state.player === 'player1') {
      const obstaclePos = parseInt($(`.${obstacle}`).css('top'), 10);
      const border = parseInt($('.border').css('top'), 10) + 16;
      if (obstaclePos === -16 || obstaclePos >= border - this.gameDefaultValues.obstacleSpeed) {
        this.gameDefaultValues.previousObstacle = obstacle;
        lobbiesData.updateObstacle(JSON.stringify(obstacle), this.lobbyId);
      }
    }
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
    const player1 = this.getDimensions('.player1');
    const player2 = this.getDimensions('.player2');
    this.gameDefaultValues.obstacleIds.forEach((obstacleId) => {
      const obstacle = this.getDimensions(`.${obstacleId}`);
      if (player1.lx < obstacle.rx && player1.rx > obstacle.lx && player1.ty < obstacle.by && player1.by > obstacle.ty) {
        this.gameOver('Blue');
      }
      if (player2.lx < obstacle.rx && player2.rx > obstacle.lx && player2.ty < obstacle.by && player2.by > obstacle.ty) {
        this.gameOver('Red');
      }
    });
  }

  componentDidMount() {
    this.initLobby();
  }

  componentWillUnmount() {
    this.gameOver();
    // this.destroyLobby();
  }

  render() {
    const { lobby } = this.state;
    return (
      <div className="BlockMatrix p-5 vh-100">
        <div className="game-screen multiplayer-screen h-100 m-auto bg-dark position-relative overflow-hidden">
          <div className="border bg-info position-absolute"></div>

          <div className="obstacle1 obstacle bg-info position-absolute"></div>
          <div className="obstacle2 obstacle bg-info position-absolute"></div>
          <div className="obstacle3 obstacle bg-info position-absolute"></div>
          <div className="obstacle4 obstacle bg-info position-absolute"></div>
          <div className="obstacle5 obstacle bg-info position-absolute"></div>
          <div className="obstacle6 obstacle bg-info position-absolute"></div>
          <div className="obstacle7 obstacle bg-info position-absolute"></div>
          <div className="obstacle8 obstacle bg-info position-absolute"></div>
          <div className="obstacle9 obstacle bg-info position-absolute"></div>
          <div className="obstacle10 obstacle bg-info position-absolute"></div>
          <div className="obstacle11 obstacle bg-info position-absolute"></div>
          <div className="obstacle12 obstacle bg-info position-absolute"></div>
          <div className="obstacle13 obstacle bg-info position-absolute"></div>
          <div className="obstacle14 obstacle bg-info position-absolute"></div>
          <div className="obstacle15 obstacle bg-info position-absolute"></div>
          <div className="obstacle16 obstacle bg-info position-absolute"></div>
          <div className="obstacle17 obstacle bg-info position-absolute"></div>
          <div className="obstacle18 obstacle bg-info position-absolute"></div>
          <div className="obstacle19 obstacle bg-info position-absolute"></div>
          <div className="obstacle20 obstacle bg-info position-absolute"></div>


          <div className="player1 bg-primary position-absolute"></div>
          <div className="player2 bg-danger position-absolute"></div>

          <div className="p-3 text-white position-absolute">Score: <span className="score">0</span></div>

          <div className="h-100 d-flex justify-content-center align-items-center">

            <div className="announcer display-1 text-white"></div>

            <div className="lobby-queue text-white">
              <div className="display-4">Block Matrix Lobby</div>
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">Ready</th>
                    <th scope="col">Players</th>
                    <th scope="col">Lobby</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">{lobby.player1Ready ? (<i className="fas fa-check hover-pointer" onClick={this.changePlayer1Status}></i>) : (<i className="fas fa-times hover-pointer" onClick={this.changePlayer1Status}></i>)}</th>
                    <td>{lobby.player1}</td>
                    <td>{lobby.lobbyCode}</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {lobby.player2 === '' ? (<div className="spinner-border text-light" role="status"><span className="sr-only">Loading...</span></div>) : ('')}
                      {lobby.player2 !== '' && lobby.player2Ready === false ? (<i className="fas fa-times hover-pointer" onClick={this.changePlayer2Status}></i>) : ('')}
                      {lobby.player2 !== '' && lobby.player2Ready === true ? (<i className="fas fa-check hover-pointer" onClick={this.changePlayer2Status}></i>) : ('')}
                    </th>
                    <td>{lobby.player2 === '' ? ('Waiting for player...') : (lobby.player2)}</td>
                    <td>{lobby.lobbyCode}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BlockMatrixMultiplayer;
