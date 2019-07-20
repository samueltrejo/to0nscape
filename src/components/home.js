import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import profileData from '../helpers/data/profile-data';

import Navbar from './navbar';
import HomeGames from './home-games';
import Footer from './footer';

class Home extends React.Component {
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
    const { authed } = this.props;
    return (
      <div>
        <Navbar authed={authed} profile={profile} carousel={true} />
        <HomeGames />
        <Footer />
      </div>
    );
  }
}

export default Home;
