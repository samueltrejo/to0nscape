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
            } else if (lobby.player2 === '' || lobby.player2 === profile.username) {
              lobbyCopy.player2 = profile.username;
              this.setState({ player: 'player2' });
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

  gameOver = () => {
    clearInterval(this.movePlayerInterval);
    clearInterval(this.setObstaclesInterval);
    $('body').off('keydown', this.movePlayer);
    $('body').off('keyup', this.stopPlayer);

    this.endGameScreen();
    $('.announcer').fadeIn();
  }

  endGameScreen = () => {
    let endGameInfo = '<div>You Lose!</div><div class="d-flex">';
    endGameInfo += '<button class="to-start btn btn-outline-light ml-auto mr-3">Back</button>';
    endGameInfo += '<button class="retry btn btn-outline-light">Try Again</button></div>';
    $('.announcer').html(endGameInfo);
    $('.to-start').off('click', this.toStart);
    $('.retry').off('click', this.launchGame);
    $('.to-start').on('click', this.toStart);
    $('.retry').on('click', this.launchGame);
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
    // console.error(data.val().obstacle);
    // this.dropObstacle(data.val().obstacle);
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
    if (player === 'player1' && player1Right && player1Pos < gameScreenWidth - 19) {
      player1Pos += playerMovementSpeed;
    }
    if (player === 'player2' && player2Left && player2Pos > 0) {
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

    // console.error(this.lobby, this.lobbyId);
    // this.updatePlayer(this.lobby);

    // this.collisionCheck();
    // $('.player').css('left', `${playerPos}px`);
    // lobbiesData.updateLobby(this.lobby, this.state.lobby.id);
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
    // const obstaclePos = parseInt($(`.${obstacle}`).css('top'), 10);
    const border = parseInt($('.border').css('top'), 10) + 16;
    // if (obstaclePos === -16 || obstaclePos >= border - this.gameDefaultValues.obstacleSpeed) {
    for (let i = 0; i <= border; i += this.gameDefaultValues.obstacleSpeed) {
      setTimeout(() => {
        $(`.${obstacle}`).css('top', `${i}px`);
        // lobbiesData.updateObstaclePos(i, obstacle, this.lobbyId);
      }, this.gameDefaultValues.obstacleDropSpeed * i);
      if (i >= border - this.gameDefaultValues.obstacleSpeed) {
        setTimeout(() => {
          $(`.${obstacle}`).css('top', '-16px');
          // lobbiesData.updateObstaclePos(i, obstacle, this.lobbyId);
        }, this.gameDefaultValues.obstacleDropSpeed * i);
        // }
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
        // console.error(obstacle);
        lobbiesData.updateObstacle(JSON.stringify(obstacle), this.lobbyId);
      }
    }
    // this.dropObstacle(obstacle);
    // console.error(obstacle, this.lobbyId);
  };

  // COLLISION DETECTION

  getDimensions = (target) => {
  // console.error($(`.${target}`)[0]);
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
        this.gameOver();
      }
      if (player2.lx < obstacle.rx && player2.rx > obstacle.lx && player2.ty < obstacle.by && player2.by > obstacle.ty) {
        this.gameOver();
      }
    });
  }

  componentDidMount() {
    // this.launchGame();
    this.initLobby();
  }

  // GAME PREPARATION

  // startGame = () => {
  //   const { lobby } = this.state;
  //   lobby.player1Pos = 0;
  //   lobby.player2Pos = 0;

  //   this.gameDefaultValues = {
  //     gameScreenWidth: 0,
  //     // playerPos: 0,
  //     moveStateLeft: false,
  //     moveStateRight: false,
  //     obstacleIds: [],
  //     score: 0,
  //     obstacleDropSpeed: 10,
  //     playerMovementSpeed: 1,
  //     movePlayerIntervalSpeed: 10,
  //     launchObstaclesIntervalSpeed: 100,
  //     lobbyValues: {},
  //   };

  //   this.getDefaultValues();
  //   this.generateObstacles(64);
  //   this.detectScreenResize();

  //   $('body').on('keydown', this.movePlayer);
  //   $('body').on('keyup', this.stopPlayer);

  //   this.movePlayerInterval = setInterval(this.updatePlayerPos, this.gameDefaultValues.movePlayerIntervalSpeed);
  //   this.setObstaclesInterval = setInterval(this.launchObstacles, this.gameDefaultValues.launchObstaclesIntervalSpeed);
  //   this.setScoreInterval = setInterval(this.updateScore, 1000);
  //   this.difficultyInterval = setInterval(this.increaseDifficulty, 1000);
  // }

  // gameOver = () => {
  //   clearInterval(this.movePlayerInterval);
  //   clearInterval(this.setObstaclesInterval);
  //   clearInterval(this.setScoreInterval);
  //   clearInterval(this.difficultyInterval);
  //   $('body').off('keydown', this.movePlayer);
  //   $('body').off('keyup', this.stopPlayer);
  //   $(window).off('resize', this.gameOver);

  //   this.endGameScreen();
  //   $('.announcer').fadeIn();
  // }

  // endGameScreen = () => {
  //   let endGameInfo = '<div>You Lose!</div><div className="d-flex">';
  //   endGameInfo += '<button className="to-start btn btn-outline-light ml-auto mr-3">Back</button>';
  //   endGameInfo += '<button className="save-score btn btn-outline-light mr-3">Save and View Score</button>';
  //   endGameInfo += '<button className="retry btn btn-outline-light">Try Again</button></div>';
  //   $('.announcer').html(endGameInfo);
  //   $('.to-start').off('click', this.toStart);
  //   $('.save-score').off('click', this.saveScore);
  //   $('.retry').off('click', this.launchGame);
  //   $('.to-start').on('click', this.toStart);
  //   $('.save-score').on('click', this.saveScore);
  //   $('.retry').on('click', this.launchGame);
  // }

  // getDefaultValues = () => {
  //   const gameScreenWidth = parseInt($('.game-screen').width(), 10);
  //   const playerPos = gameScreenWidth / 2;
  //   this.gameDefaultValues.gameScreenWidth = gameScreenWidth;
  //   this.gameDefaultValues.playerPos = playerPos;
  // }

  // increaseDifficulty = () => {
  //   // this.gameDefaultValues.obstacleDropSpeed = 10;
  //   let os = this.gameDefaultValues.obstacleDropSpeed;
  //   // this.gameDefaultValues.playerMovementSpeed = 1;
  //   let ps = this.gameDefaultValues.playerMovementSpeed;
  //   // this.gameDefaultValues.movePlayerIntervalSpeed = 10;
  //   // this.gameDefaultValues.launchObstaclesIntervalSpeed = 100;
  //   if (os >= 1) {
  //     os -= 0.1;
  //   }
  //   if (ps <= 7) {
  //     ps += 0.07;
  //   }
  //   console.error('os', os, 'ps', ps, 'sw', this.gameDefaultValues.gameScreenWidth);
  //   this.gameDefaultValues.obstacleDropSpeed = os;
  //   this.gameDefaultValues.playerMovementSpeed = ps;
  // }

  // toStart = () => {
  //   this.props.history.push('/blockmatrix-startscreen');
  // }

  // PLAYER MOVEMENT

  // updatePlayerPos = () => {
  //   let { playerPos } = this.gameDefaultValues;
  //   const { moveStateLeft, moveStateRight, gameScreenWidth } = this.gameDefaultValues;

  //   if (moveStateRight && playerPos < gameScreenWidth - 19) {
  //     playerPos += this.gameDefaultValues.playerMovementSpeed;
  //     this.gameDefaultValues.playerPos = playerPos;
  //   }
  //   if (moveStateLeft && playerPos > 0) {
  //     playerPos -= this.gameDefaultValues.playerMovementSpeed;
  //     this.gameDefaultValues.playerPos = playerPos;
  //   }

  //   this.collisionCheck();
  //   $('.player').css('left', `${playerPos}px`);
  // };

  // movePlayer = (event) => {
  //   const { keyCode } = event;
  //   if (keyCode === 37) {
  //     this.gameDefaultValues.moveStateLeft = true;
  //   } else if (keyCode === 39) {
  //     this.gameDefaultValues.moveStateRight = true;
  //   }
  // }

  // stopPlayer = (event) => {
  //   const { keyCode } = event;
  //   if (keyCode === 37) {
  //     this.gameDefaultValues.moveStateLeft = false;
  //   } else if (keyCode === 39) {
  //     this.gameDefaultValues.moveStateRight = false;
  //   }
  // }

  // OBSTACLE GENERATION

  // generateObstacles = (width) => {
  //   const obstacles = [];
  //   const obstacleIds = [];
  //   const amountObstacles = this.gameDefaultValues.gameScreenWidth / width;

  //   for (let i = 0; i < amountObstacles; i += 1) {
  //     const obstacleId = `obstacle${i}`;
  //     const obstacleCSS = {
  //       left: `${parseFloat(width * i).toFixed(2)}px`,
  //       width,
  //     };
  //     obstacles.push(<div key={obstacleId} id={obstacleId} className="obstacle bg-info position-absolute" style={obstacleCSS}></div>);
  //     obstacleIds.push(`#${obstacleId}`);
  //   }

  //   this.gameDefaultValues.obstacleIds = obstacleIds;
  //   this.setState({ obstacles: [] });
  //   this.setState({ obstacles });
  // }

  // randomObstacle = () => {
  //   const randomNum = Math.floor(Math.random() * this.gameDefaultValues.obstacleIds.length);
  //   const obstacle = this.gameDefaultValues.obstacleIds[randomNum];
  //   return obstacle;
  // }

  // dropObstacle = (obstacle) => {
  //   const obstaclePos = parseInt($(obstacle).css('top'), 10);
  //   const border = parseInt($('.border').css('top'), 10) + 16;
  //   if (obstaclePos === -16 || obstaclePos >= border) {
  //     for (let i = 0; i <= border; i += 1) {
  //       setTimeout(() => {
  //         $(obstacle).css('top', `${i}px`);
  //       }, this.gameDefaultValues.obstacleDropSpeed * i);
  //       if (i >= border) {
  //         setTimeout(() => {
  //           $(obstacle).css('top', '-16px');
  //         }, this.gameDefaultValues.obstacleDropSpeed * i);
  //       }
  //     }
  //   }
  // }

  // launchObstacles = () => {
  //   const obstacle = this.randomObstacle();
  //   this.dropObstacle(obstacle);
  // };

  // COLLISION DETECTION

  // getDimensions = (target) => {
  //   const dimensions = {
  //     lx: $(target).position().left,
  //     ty: $(target).position().top,
  //     rx: $(target).position().left + $(target).width(),
  //     by: $(target).position().top + $(target).height(),
  //   };
  //   return dimensions;
  // };

  // collisionCheck = () => {
  //   const player = this.getDimensions('.player');
  //   this.gameDefaultValues.obstacleIds.forEach((obstacleId) => {
  //     const obstacle = this.getDimensions(obstacleId);
  //     if (player.lx < obstacle.rx && player.rx > obstacle.lx && player.ty < obstacle.by && player.by > obstacle.ty) {
  //       this.gameOver();
  //     }
  //   });
  // }

  // SCORING SYSTEM

  // updateScore = () => {
  //   this.gameDefaultValues.score += 1;
  //   $('.score').text(this.gameDefaultValues.score);
  // }

  // saveScore = () => {
  //   $('.save-score').off('click', this.saveScore);
  //   $('.retry').off('click', this.launchGame);
  //   profileData.getMyProfile(firebase.auth().currentUser.uid)
  //     .then((profile) => {
  //       const score = {
  //         score: this.gameDefaultValues.score,
  //         game: 'Block Matrix',
  //         username: profile.username,
  //       };
  //       scoresData.postScore(score)
  //         .then(() => this.props.history.push('/leaderboards'));
  //     })
  //     .catch(error => console.error(error));
  // }

  // ANTI CHEAT

  // detectScreenResize = () => {
  //   $(window).on('resize', this.gameOver);
  // }

  // componentDidMount() {
  //   this.launchGame();
  //   this.initLobby();
  // }

  // componentWillUnmount() {
  //   this.gameOver();
  // }

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
