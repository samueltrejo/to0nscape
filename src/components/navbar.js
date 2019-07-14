import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

class Navbar extends React.Component {
  logout = (event) => {
    event.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="Navbar navbar navbar-expand-lg navbar-dark bg-dark p-0">
        <div className="container">
          <Link to="/home" className="navbar-brand">To0nscape</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/profile" className="nav-item nav-link">Profile</Link>
              <Link to="/leaderboards" className="nav-item nav-link">Leaderboards</Link>
              <span className="nav-item nav-link" onClick={this.logout}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
