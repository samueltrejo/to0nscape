import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import profileData from '../helpers/data/profile-data';

import NewProfile from './new-profile';
import MyProfile from './my-profile';

class Profile extends React.Component {
  state = {
    profile: {},
  }

  redirectToHome = () => {
    this.props.history.push('/home');
  }

  componentDidMount() {
    const { uid } = firebase.auth().currentUser;
    profileData.getMyProfile(uid)
      .then(profile => this.setState({ profile }))
      .catch(error => console.error(error));
  }

  render() {
    const { profile } = this.state;
    return (
      <div>
        {Object.keys(profile).length ? ('') : (<NewProfile redirectToHome={this.redirectToHome} />)}
        {Object.keys(profile).length ? (<MyProfile redirectToHome={this.redirectToHome} profile={profile} />) : ('')}
      </div>
    );
  }
}

export default Profile;
