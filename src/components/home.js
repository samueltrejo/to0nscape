import React from 'react';
import HomeNavbar from './home-navbar';

class Home extends React.Component {
  render() {
    const { authed } = this.props;
    return (
      <div>
        <HomeNavbar authed={authed} />
      </div>
    );
  }
}

export default Home;
