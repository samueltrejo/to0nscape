import React from 'react';
import Navbar from './navbar';

class MyProfile extends React.Component {
  render() {
    const { profile } = this.props;
    return (
      <div>
        <Navbar />
        <div className="hero-image overflow-hidden">
          <img src="https://i.imgur.com/6QPY9Cz.jpg" className="img-fluid" alt="..."></img>
        </div>
        <div className="container">
          <div className="row">

            <div className="card col-2 p-0 m-0">
              <div className="profile-picture">
                <img src={profile.image} className="card-img-top" alt="..." />
              </div>
              <div className="card-body">
                <p className="lead">{profile.username}</p>
                <p className="lead">{profile.bio}</p>
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
