import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import profileData from '../helpers/data/profile-data';

import Navbar from './navbar';

class Leaderboards extends React.Component {
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
  }

  render() {
    const { profile } = this.state;
    return (
      <div className="Leaderboards">
        <Navbar authed={true} carousel={false} profile={profile} />
        <h3>Leaderboards</h3>
      </div>
    );
  }
}

export default Leaderboards;
