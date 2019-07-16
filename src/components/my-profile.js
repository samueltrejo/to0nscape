import React from 'react';

import Navbar from './navbar';

import profileData from '../helpers/data/profile-data';

class MyProfile extends React.Component {
  state = {
    edit: false,
    profile: this.props.profile,
  }

  updateProfile = (event) => {
    event.preventDefault();
    const profileCopy = { ...this.state.profile };
    profileData.updateProfile(profileCopy)
      .then(() => this.props.redirectToHome())
      .catch(error => console.error(error));
  }

  initiateEditState = () => {
    this.setState({ edit: true });
  }

  cancelEditState = () => {
    this.setState({ edit: false });
  }

  stateProfileChange = (type, event) => {
    const profileCopy = { ...this.state.profile };
    profileCopy[type] = event.target.value;
    this.setState({ profile: profileCopy });
  }

  updateUsername = event => this.stateProfileChange('username', event)

  updateImage = event => this.stateProfileChange('image', event)

  updateBio = event => this.stateProfileChange('bio', event)

  render() {
    const { edit } = this.state;
    const { profile } = this.props;
    return (
      <div>
        <Navbar />
        <div className="hero-image overflow-hidden position-relative">
          <img src="https://i.imgur.com/6QPY9Cz.jpg" className="img-fluid" alt="..." />
            {edit ? (
              <div className="edit-profile position-absolute">
                <button className="btn btn-dark mr-3" onClick={this.cancelEditState}>Cancel</button>
                <button className="btn btn-dark" onClick={this.updateProfile}>Save Profile</button>
              </div>)
              : (
              <div className="edit-profile position-absolute">
                <button className="btn btn-dark" onClick={this.initiateEditState}>Edit Profile</button>
              </div>
              )}
        </div>
        <div className="container">
          <div className="row">

            <div className="card col-2 p-0 m-0">
              <div className="profile-picture">
                {edit ? (<input type="text" className="form-control mb-4" placeholder="Profile Picture" value={profile.image} onChange={this.updateImage} />)
                  : (<img src={profile.image} className="card-img-top" alt="..." />)}
              </div>
              <div className="card-body">
                {edit ? (<input type="text" className="form-control mb-4" placeholder="Username" value={profile.username} onChange={this.updateUsername} />)
                  : (<p className="lead">{profile.username}</p>)}
                {edit ? (<input type="text" className="form-control mb-4" placeholder="Bio" value={profile.bio} onChange={this.updateUsername} />)
                  : (<p className="lead">{profile.bio}</p>)}
              </div>
            </div>

            <div className="col-10 p-5 m-0">
              <div className="card h-100">Avatars Section</div>
            </div>

          </div>
          <div className="row">
            <div className="col-10 p-5 m-0">
              <div className="card h-100">Scores Section</div>
            </div>
          </div>
        </div>


        <div></div>
      </div>
    );
  }
}

export default MyProfile;
