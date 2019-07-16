import React from 'react';
import Navbar from './navbar';

class MyProfile extends React.Component {
  state = {
    edit: false,
    profile: this.props.profile,
  }

  render() {
    const { edit } = this.state;
    const { profile } = this.props;
    return (
      <div>
        <Navbar />
        <div className="hero-image overflow-hidden">
          <img src="https://i.imgur.com/6QPY9Cz.jpg" className="img-fluid" alt="..." />
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
