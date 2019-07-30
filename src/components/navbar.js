import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import $ from 'jquery';

import HomeCarousel from './home-carousel';
import NavbarHero from './navbar-hero';

class Navbar extends React.Component {
  componentDidMount() {
    $('.carousel').carousel({
      interval: 5000,
    });
  }

  login = (event) => {
    event.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  logout = (event) => {
    event.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const {
      authed,
      carousel,
      profile,
      hero,
      heroUrl,
    } = this.props;
    const profileLink = Object.keys(profile).length ? (<Link to={`/profile/${profile.username}`} className="nav-item nav-link"><i class="fas fa-user-ninja"></i> Profile</Link>)
      : (<Link to="/new-profile" className="nav-item nav-link"><i class="fas fa-user-ninja"></i> Profile</Link>);

    return (
      <div className="h-100">
        <div className="navbar navbar-expand-lg navbar-dark bg-dark d-flex flex-column p-0 h-100">

          {carousel ? (<HomeCarousel contentLoaded={this.props.contentLoaded} />) : ('')}
          {/* {carousel ? (<div className="backdrop position-absolute"></div>) : ('')} */}
          {hero ? (<NavbarHero heroUrl={heroUrl} />) : ('')}

          <div className={carousel ? ('HomeNavbar container position-absolute') : ('HomeNavbar container position-absolute')}>
            <Link to="/home" className="font-weight-bold text-aqua navbar-brand"><i class="fas fa-home"></i> To0nscape</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                {authed ? (profileLink) : ('')}
                {authed ? (<Link to="/leaderboards" className="nav-item nav-link"><i class="fas fa-palette"></i> About Us</Link>) : ('')}
                {authed ? (<Link to="/leaderboards" className="nav-item nav-link"><i class="fas fa-sliders-h"></i> Leaderboards</Link>) : ('')}
                {authed ? (<Link to="/leaderboards" className="nav-item nav-link"><i class="fas fa-newspaper"></i> Forums</Link>) : ('')}
                {authed ? (<span className="nav-item nav-link" onClick={this.logout}><i class="fas fa-bed"></i> Logout</span>) : ('')}
                {!authed ? (<span className="nav-item nav-link" onClick={this.login}><i class="fab fa-google"></i> Sign In</span>) : ('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
