import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import $ from 'jquery';

import profileData from '../helpers/data/profile-data';
import lobbiesData from '../helpers/data/lobbies-data';
import heroUrl from '../images/games-card1.jpg';

import LoadingScreen from './loading-screen';
import Navbar from './navbar';

class BattleshipStartscreen extends React.Component {
  state = {
    profile: {},
    lobbyCode: '',
    lobbyInputValue: '',
    loaded: false,
  }

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

  generateLobbyCode = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  createLobby = () => {
    const lobby = {
      player1: this.state.profile.username,
      player1Ready: false,
      player1Present: false,
      player1Pos: 0,
      player2: '',
      player2Ready: false,
      player2Present: false,
      player2Pos: 0,
      lobbyCode: this.generateLobbyCode(5),
    };

    lobbiesData.createLobby(lobby)
      .then(() => this.props.history.push(`/blockmatrix/${lobby.lobbyCode}`))
      .catch(error => console.error(error));
  }

  updateLobbyInputState = (event) => {
    const lobbyInputValue = event.target.value;
    this.setState({ lobbyInputValue });
  }

  joinLobby = () => {
    lobbiesData.getLobby(this.state.lobbyInputValue)
      .then((lobby) => {
        if (lobby.lobbyCode) {
          this.props.history.push(`/blockmatrix/${lobby.lobbyCode}`);
        }
      })
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.getMyProfile();
    $('[data-toggle="tooltip"]').tooltip();
    $('.tooltip-btn').css('pointer-events', 'none');
  }

  render() {
    const { profile, loaded } = this.state;
    return (
      <div className="BattleshipStartscreen h-100 position-relative">
        <div className={loaded ? ('app-loading h-100 invisible fixed-top') : ('LoadingScreen h-100 fixed-top')}>
          <LoadingScreen />
        </div>

        <div className={loaded ? ('app-content h-100') : ('app-content h-100 invisible')}>
          <Navbar authed={true} hero={true} profile={profile} heroUrl={heroUrl} />
          <div id="start-screen" className="col-4 mx-auto mt-5">
            <div className="modal-content">
              <h1 className="display-4 mx-auto mb-0 mt-3">Battleship</h1>
              <h6 className="m-auto">by <a className="text-muted" href="https://github.com/samueltrejo" rel="noopener noreferrer" target="_blank">@samueltrejo</a></h6>
              <div className="modal-body">
                <div className="text-center">Strategy game against a computer, try to destroy all of your enemy's ships.</div>
              </div>
              <div className="modal-footer justify-content-center flex-column">
                {Object.keys(profile).length
                  ? (<div className="d-flex">
                    <Link to="/battleship" type="button" className="btn btn-dark rounded mr-3">Start Game</Link>
                    <button type="button" className="multiplayer-btn btn btn-dark rounded" data-toggle="collapse" data-target="#multiplayer-info">Multiplayer</button>
                  </div>)
                  : (<span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="You must create a profile to play this game.">
                    <button className="btn btn-dark tooltip-btn" type="button" disabled>Start Game</button></span>)}

                <div className="collapse mt-3" id="multiplayer-info">
                  <div className="card card-body">
                    <div>
                      Click on create lobby. You will be provided a code. Give the code to a friend and to join you're lobby and click ready. Once both players are ready the game will start.
                    </div>
                    <input className="lobby-input mt-3" type="text" placeholder="Lobby Code" value={this.state.lobbyCodeInput} onChange={this.updateLobbyInputState} />
                    <div className="d-flex justify-content-end mt-3">
                      <button className="btn btn-dark mr-3" onClick={this.createLobby}>Create Lobby</button>
                      <button className="btn btn-dark" onClick={this.joinLobby}>Join Lobby</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default BattleshipStartscreen;
