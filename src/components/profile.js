import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import profileData from '../helpers/data/profile-data';

import NewProfile from './new-profile';
import MyProfile from './my-profile';

class Profile extends React.Component {
  state = {
    profile: [],
  }

  redirectToHome = () => {
    this.props.history.push('/home');
  }

  getMyProfile = () => {
    const { uid } = firebase.auth().currentUser;
    profileData.getMyProfile(uid)
      .then(profile => this.setState({ profile }))
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.getMyProfile();
  }

  render() {
    const { profile } = this.state;
    return (
      <div>
        {profile.length ? ('') : (<NewProfile getMyProfile={this.getMyProfile} redirectToHome={this.redirectToHome} />)}
        {profile.length ? (<MyProfile getMyProfile={this.getMyProfile} profile={profile[0]} />) : ('')}
      </div>
    );
  }
}

export default Profile;
