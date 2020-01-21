import React from 'react';

import Navbar from './navbar';
import HomeAbout from './home-about';
import HomeGames from './home-games';
import Footer from './footer';

class Home extends React.Component {
  render() {
    const { authed, profile } = this.props;
    return (
      <div className="Home h-100">
        <div className="app-content h-100">
          <Navbar authed={authed} profile={profile} />
          <HomeAbout />
          <HomeGames />
          <Footer />
        </div>

      </div>
    );
  }
}

export default Home;
