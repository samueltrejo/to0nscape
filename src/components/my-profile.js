import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import LoadingScreen from './loading-screen';
import Navbar from './navbar';

import profileData from '../helpers/data/profile-data';

class MyProfile extends React.Component {
  state = {
    edit: false,
    profile: {},
    loaded: false,
  }

  getMyProfile = () => {
    if (this.props.authed) {
      const { uid } = firebase.auth().currentUser;
      profileData.getMyProfile(uid)
        .then((profile) => {
          this.setState({ profile });
          setTimeout(() => this.setState({ loaded: true }), 1000);
        })
        .catch(error => console.error(error));
    }
  }

  componentDidMount() {
    this.getMyProfile();
  }

  deleteProfile = () => {
    profileData.deleteProfile(this.state.profile.id)
      .then(() => this.props.history.push('/home'))
      .catch(error => console.error(error));
  }

  updateProfile = (event) => {
    event.preventDefault();
    const profileCopy = { ...this.state.profile };
    const profileId = profileCopy.id;
    delete profileCopy.id;
    profileData.updateProfile(profileId, profileCopy)
      .then(() => {
        this.getMyProfile();
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
    const { profile, edit, loaded } = this.state;
    return (
      <div className="Profile">
        <div className={loaded ? ('app-loading h-100 d-none') : ('LoadingScreen h-100')}>
          <LoadingScreen />
        </div>

        <div className={loaded ? ('app-content h-100') : ('app-content h-100 d-none')}>
          <Navbar authed={this.props.authed} carousel={false} profile={profile} hero={true} />

          <div className="position-relative container w-100">
            <div className="profile-image-container position-absolute w-100">
              <div className="row w-100">

                <div className="col-4 w-100">
                  <div className="card profile-card rounded-0 border-0">
                    {edit ? (<input type="text" className="w-100 form-control mb-4" placeholder="Profile Picture" value={profile.image} onChange={this.updateImage} />)
                      : (<img src={profile.image} className="card-img-top rounded-0" alt="..." />)}
                    <div className="card-body">
                        <div className="lead mr-3">Username</div>
                        {edit ? (<input type="text" className="form-control mb-4" placeholder="Username" value={profile.username} onChange={this.updateUsername} />)
                          : (<p className="lead mt-3"><strong>{profile.username}</strong></p>)}
                      <div className="lead mt-3">About Me</div>
                      {edit ? (<input type="text" className="form-control mb-4" placeholder="Bio" value={profile.bio} onChange={this.updateBio} />)
                        : (<p className="lead mt-3">{profile.bio}</p>)}
                    </div>
                  </div>
                </div>

                <div className="col-8">
                  <div className="d-flex justify-content-between">
                    <div className="display-4 text-aqua"><strong>{profile.username}</strong></div>
                    <div>
                      {edit ? (
                      <div className="edit-profile">
                        <button className="btn btn-outline-light mr-3" onClick={this.cancelEditState}>Cancel</button>
                        <button className="btn btn-outline-light" onClick={this.updateProfile}>Save Profile</button>
                      </div>)
                        : (
                      <div className="edit-profile">
                        <button className="btn btn-outline-light mr-3" onClick={this.initiateEditState}>Edit Profile</button>
                        <button className="btn btn-outline-light" data-toggle="modal" data-target="#delete-confirmation" onClick={this.openConfirmDelete}>Delete Profile</button>
                      </div>)}
                    </div>
                  </div>

                  <div class="card mt-5">
                    <div class="row no-gutters">
                      <div class="col-md-4">
                        <img src="..." class="card-img" alt="..." />
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">Card title</h5>
                          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>

              </div>
            </div>
          </div>

          {/* <div className="container">

            <div className="row">

              <div className="col-8 p-5 m-0">
                <div className="card h-100">Avatars Section</div>
              </div>

            </div>
            <div className="row">
              <div className="col-10 p-5 m-0">
                <div className="card h-100">Scores Section</div>
              </div>
            </div>
          </div> */}

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
      </div>
    );
  }
}

export default MyProfile;
