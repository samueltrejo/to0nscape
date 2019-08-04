import React from 'react';

class ProfileHero extends React.Component {
  render() {
    return (
      <div className="hero-image-container" style={{ backgroundImage: `url(${this.props.heroUrl})` }}>
        <div className="overlay h-100">
          <img src="https://i.imgur.com/E7pGflz.jpg" className="img-fluid hero-image" alt="..." />
        </div>
      </div>
    );
  }
}

export default ProfileHero;
