import React from 'react';

import Navbar from './navbar';

class Profile extends React.Component {
  render() {
    return (
      <div className="Profile">
        <Navbar />
        <h3>Profile</h3>
      </div>
    );
  }
}

export default Profile;
