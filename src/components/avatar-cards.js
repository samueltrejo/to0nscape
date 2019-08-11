import React from 'react';

import profileData from '../helpers/data/profile-data';

class AvatarCard extends React.Component {
  updateProfileAvatar = () => {
    profileData.updateProfileAvatar(this.props.profileId, JSON.stringify(this.props.avatar.image))
      .then(() => this.props.getMyProfile())
      .catch(error => console.error(error));
  }

  render() {
    const { avatar, avatarImages } = this.props;
    return (
      <div className="GameCard col-6 mb-5" onClick={this.updateProfileAvatar}>
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
