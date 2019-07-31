import React from 'react';

class AvatarCard extends React.Component {
  render() {
    const { avatar, avatarImages } = this.props;
    return (
      <div className="GameCard col-6 mb-5">
        <div className="card border-0 rounded-0">
          <img src={avatarImages[avatar.image]} className="avatar-images rounded-0 m-auto" alt="..." />
        </div>
        <div className="card-body p-0">
          <div className="d-flex align-items-center justify-content-center">
            <h5 className="card-title mb-0">{avatar.name}</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default AvatarCard;
