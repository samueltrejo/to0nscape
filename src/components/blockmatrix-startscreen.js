import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import $ from 'jquery';

import profileData from '../helpers/data/profile-data';

import Navbar from './navbar';

class BlockMatrixStartscreen extends React.Component {
  state = {
    profile: {},
  }

  getMyProfile = () => {
    if (this.props.authed) {
      const { uid } = firebase.auth().currentUser;
      profileData.getMyProfile(uid)
        .then(profile => this.setState({ profile }))
        .catch(error => console.error(error));
    }
  }

  componentDidMount() {
    this.getMyProfile();
    $('[data-toggle="tooltip"]').tooltip();
    $('.tooltip-btn').css('pointer-events', 'none');
  }

  render() {
    const { profile } = this.state;
    return (
      <div className="BlockMatrixStartscreen">
        <Navbar authed={true} carousel={false} profile={profile} />
        <div id="start-screen" className="col-4 mx-auto mt-5">
          <div className="modal-content">
            <h1 className="display-4 mx-auto mb-0 mt-3">Block Matrix</h1>
            <h6 className="m-auto">by <a className="text-muted" href="https://github.com/samueltrejo" target="blank">@samueltrejo</a></h6>
            <div className="modal-body">
              <div className="text-center">Use left and right arrows to dodge the obstacles. Have fun!</div>
            </div>
            <div className="modal-footer justify-content-center flex-column">
              {Object.keys(profile).length ? (<Link to="/blockmatrix" type="button" className="btn btn-dark rounded">Start Game</Link>)
                : (<span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="You must create a profile to play this game.">
                <button className="btn btn-dark tooltip-btn" type="button" disabled>Start Game</button></span>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BlockMatrixStartscreen;
