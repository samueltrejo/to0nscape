import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import profileData from '../helpers/data/profile-data';

import LoadingScreen from './loading-screen';
import Navbar from './navbar';
import HomeAbout from './home-about';
import HomeGames from './home-games';
import Footer from './footer';

class Home extends React.Component {
  state = {
    profile: {},
    loaded: false,
  }

  getMyProfile = () => {
    if (this.props.authed) {
      const { uid } = firebase.auth().currentUser;
      profileData.getMyProfile(uid)
        .then((profile) => {
          this.setState({ profile });
          this.loadTimer = setTimeout(() => this.setState({ loaded: true }), 1000);
        })
        .catch(error => console.error(error));
    } else {
      this.loadTimer = setTimeout(() => this.setState({ loaded: true }), 1000);
    }
  }

  componentDidMount() {
    this.getMyProfile();
  }

  componentWillUnmount() {
    clearTimeout(this.loadTimer);
  }

  render() {
    const { profile, loaded } = this.state;
    const { authed } = this.props;
    return (
      <div className="Home h-100">
        <div className={loaded ? ('app-loading h-100 invisible fixed-top') : ('LoadingScreen h-100 fixed-top')}>
          {authed ? (<LoadingScreen />) : ('')}
        </div>

        <div className={loaded ? ('app-content h-100') : ('app-content h-100 invisible')}>
          <Navbar authed={authed} profile={profile} carousel={true} />
          <HomeAbout />
          <HomeGames />
          <Footer />
        </div>

      </div>
    );
  }
}

export default Home;
