import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import LoadingScreen from './loading-screen';
import Navbar from './navbar';
import ProfileAvatars from './profile-avatars';
import ProfileScores from './profile-scores';
import Footer from './footer';

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
      <div className="Profile h-100">
        <div className={loaded ? ('app-loading h-100 invisible fixed-top') : ('LoadingScreen h-100 fixed-top')}>
          <LoadingScreen />
        </div>

        <div className={loaded ? ('app-content h-100') : ('app-content h-100 invisible')}>
          <Navbar authed={this.props.authed} carousel={false} profile={profile} hero={true} heroUrl={profile.hero} />

          <div className="position-relative w-100">
            <div className="profile-image-container position-absolute w-100">
              <div className="container">
                <div className="row w-100">

                  <div className="col-md-12 col-lg-4 w-100 order-12 order-lg-1">
                    <div className="card profile-card rounded-0 border-0">
                      {edit ? (<div className="m-4"><input type="text" className="w-100 form-control mb-4" placeholder="Profile Picture" value={profile.image} onChange={this.updateImage} /></div>)
                        : (<img src={profile.image} className="card-img-top rounded-0" alt="..." />)}
                      <div className="card-body">
                          <div className="lead mr-3"><strong>Username</strong></div>
                          {edit ? (<input type="text" className="form-control mb-4" placeholder="Username" value={profile.username} onChange={this.updateUsername} />)
                            : (<p className="lead mt-3">{profile.username}</p>)}
                        <div className="lead mt-3"><strong>About Me</strong></div>
                        {edit ? (<input type="text" className="form-control mb-4" placeholder="Bio" value={profile.bio} onChange={this.updateBio} />)
                          : (<p className="lead mt-3">{profile.bio}</p>)}
                        <div className="lead mt-3"><strong>Avatar</strong></div>
                        <p className="lead mt-3">{profile.avatar}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 col-lg-8 mt-5 order-1 order-lg-12 mb-5">
                    <div className="d-flex justify-content-between">
                      <div className="display-4 text-white"><strong>{profile.username}</strong></div>
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

                    <div className="card mt-5">
                      <div className="row no-gutters">
                        <div className="col-12">
                          <div className="card-body">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                              <li className="nav-item">
                                <span className="nav-link lead active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Avatars</span>
                              </li>
                              <li className="nav-item">
                                <span className="nav-link lead" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Scores</span>
                              </li>
                              <li className="nav-item">
                                <span className="nav-link lead" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">My Posts</span>
                              </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"><ProfileAvatars getMyProfile={this.getMyProfile} profileId={profile.id} /></div>
                              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"><ProfileScores /></div>
                              <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>

                </div>
              </div>
              <Footer />
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
      </div>
    );
  }
}

export default MyProfile;
