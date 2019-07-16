import React from 'react';

import Navbar from './navbar';

import profileData from '../helpers/data/profile-data';

class MyProfile extends React.Component {
  state = {
    edit: false,
    profile: this.props.profile,
  }

  deleteProfile = () => {
    profileData.deleteProfile(this.props.profile.id)
      .then(() => this.props.getMyProfile())
      .catch(error => console.error(error));
  }

  updateProfile = (event) => {
    event.preventDefault();
    const profileCopy = { ...this.state.profile };
    const profileId = profileCopy.id;
    delete profileCopy.id;
    profileData.updateProfile(profileId, profileCopy)
      .then(() => {
        this.props.getMyProfile();
        this.cancelEditState();
      })
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
    const { profile, edit } = this.state;
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
                <button className="btn btn-dark mr-3" onClick={this.initiateEditState}>Edit Profile</button>
                <button className="btn btn-dark" data-toggle="modal" data-target="#delete-confirmation" onClick={this.openConfirmDelete}>Delete Profile</button>
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
                {edit ? (<input type="text" className="form-control mb-4" placeholder="Bio" value={profile.bio} onChange={this.updateBio} />)
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

        <div id="delete-confirmation" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content ">
              <h1 className="display-4 mx-auto mb-0 mt-3">Confirm</h1>
              <div className="modal-body">
                <div className="text-center">Are you sure you want to delete your profile?</div>
                <div className="text-center text-black-50">You won't be able to play games without a profile.</div>
              </div>
              <div className="modal-footer justify-content-center">
                <button id="start-game" type="button" className="btn btn-dark" data-dismiss="modal" onClick={this.deleteProfile}>Yes</button>
                <button id="start-game" type="button" className="btn btn-dark" data-dismiss="modal">Nooo!</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyProfile;
