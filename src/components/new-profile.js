import React from 'react';

const newProfileDefault = {
  username: '',
  image: '',
  bio: '',
};

class NewProfile extends React.Component {
  state = {
    newProfile: newProfileDefault,
  }

  stateProfileChange = (type, event) => {
    const newProfileCopy = { ...this.state.newProfile };
    newProfileCopy[type] = event.target.value;
    console.error(newProfileCopy);
    this.setState({ newProfile: newProfileCopy });
  }

  updateUsername = event => this.stateProfileChange('username', event)

  updateImage = event => this.stateProfileChange('image', event)

  updateBio = event => this.stateProfileChange('bio', event)

  render() {
    const { username, image, bio } = this.state;
    const { updateUsername, updateImage, updateBio } = this;

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
                      <input type="text" className="form-control mb-4" placeholder="Username" value={username} onChange={updateUsername} />
                      <input type="text" className="form-control mb-4" placeholder="Profile Picture" value={image} onChange={updateImage} />
                      <textarea className="form-control mb-4" rows="4" placeholder="Bio" value={bio} onChange={updateBio}></textarea>
                      <button className="btn btn-dark px-3"><i className="fas fa-address-card pr-1"></i> Create</button>
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
