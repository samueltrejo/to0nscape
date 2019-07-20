import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import profileData from '../helpers/data/profile-data';

const newProfileDefault = {
  username: '',
  image: '',
  bio: '',
};

class NewProfile extends React.Component {
  state = {
    newProfile: newProfileDefault,
  }

  createProfile = (event) => {
    event.preventDefault();
    const profile = { ...this.state.newProfile };
    profile.uid = firebase.auth().currentUser.uid;
    profileData.createProfile(profile)
      .then(() => this.props.history.push(`/profile/${profile.username}`))
      .catch(error => console.error(error));
  }

  stateProfileChange = (type, event) => {
    const newProfileCopy = { ...this.state.newProfile };
    newProfileCopy[type] = event.target.value;
    this.setState({ newProfile: newProfileCopy });
  }

  updateUsername = event => this.stateProfileChange('username', event)

  updateImage = event => this.stateProfileChange('image', event)

  updateBio = event => this.stateProfileChange('bio', event)

  render() {
    const { username, image, bio } = this.state;

    return (
      <div className="NewProfile">
        <div className="col-12 vh-100 d-flex align-items-center px-0">
          <div className="container">
            <div className="card">
              <div className="m-5">
                <div className="row no-gutters">
                  <div className="col-md-6 text-center">
                    <i className="d-none d-md-block card-img my-5 mx-auto fas fa-chess ts-change"></i>
                  </div>
                  <div className="col-md-6">
                    <div className="card-body text-center mx-5">
                      <h5 className="lead font-weight-bold mb-5 text-center">Create Profile</h5>
                      <form onSubmit={this.createProfile}>
                        <input type="text" className="form-control mb-4" placeholder="Username" value={username} onChange={this.updateUsername} />
                        <input type="text" className="form-control mb-4" placeholder="Profile Picture" value={image} onChange={this.updateImage} />
                        <textarea className="form-control mb-4" rows="4" placeholder="Bio" value={bio} onChange={this.updateBio}></textarea>
                        <div>
                          <button type="submit" className="btn btn-dark px-3 mr-3"><i className="fas fa-address-card pr-1"></i> Create</button>
                          <Link to="/home" className="btn btn-dark px-3"><i className="fas fa-address-card pr-1"></i> Back to Home</Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewProfile;
