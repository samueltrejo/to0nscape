import React from 'react';

import Navbar from './navbar';

class NewProfile extends React.Component {
  render() {
    return (
      <div className="NewProfile">
        <Navbar />
        <h3>New Profile</h3>
      </div>
    );
  }
}

export default NewProfile;
