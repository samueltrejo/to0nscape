import React from 'react';

import HomeNavbar from './home-navbar';
import HomeGames from './home-games';
import Footer from './footer';

class Home extends React.Component {
  render() {
    const { authed } = this.props;
    return (
      <div>
        <HomeNavbar authed={authed} />
        <HomeGames />
        <Footer />
      </div>
    );
  }
}

export default Home;
