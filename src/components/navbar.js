import React, { useState } from 'react';
import { NavLink as RouteLink } from 'react-router-dom';
// import { withRouter } from 'react-router';
import firebase from 'firebase/app';
import 'firebase/auth';

import {
  Collapse,
  // Dropdown,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  // NavbarText
} from 'reactstrap';

// import HomeCarousel from './home-carousel';
// import NavbarHero from './navbar-hero';

// import logo from '../images/ts-logo-white.png';


const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const loginClickEvent = (event) => {
    event.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  const logoutClickEvent = (event) => {
    event.preventDefault();
    firebase.auth().signOut();
  }

  const loginOptions = props.authed && props.profile
    ? (<UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        {props.profile.username ? (props.profile.username) : (firebase.auth().currentUser.email)}
      </DropdownToggle>
      <DropdownMenu style={{background: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5))'}} right>
        <DropdownItem tag={RouteLink} to="/profile">
          Profile
        </DropdownItem>
        <DropdownItem tag={RouteLink} to="/my-songs">
          Songs
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={logoutClickEvent}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>) : (<NavItem><NavLink onClick={loginClickEvent}>Login</NavLink></NavItem>);

  return (
    <div className="navigation fixed-top">
      <Navbar className="container w-100" color="dark" dark expand="md">
        <NavbarBrand className="brand lead" tag={RouteLink} to="/"><div className="display-4">Chordcraft</div></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto lead" navbar>
            <NavItem>
              <NavLink tag={RouteLink} to={props.authed ? ("/song") : ("/login-options")}>+Song</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouteLink} to="/song-library">Song Library</NavLink>
            </NavItem>
            {loginOptions}
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
};

// class Navbar extends React.Component {

//   login = (event) => {
//     event.preventDefault();
//     const provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth().signInWithPopup(provider);
//   }

//   logout = (event) => {
//     event.preventDefault();
//     firebase.auth().signOut();
//   }

//   render() {
//     const {
//       authed,
//       carousel,
//       profile,
//       hero,
//       heroUrl,
//     } = this.props;
//     const profileLink = profile ? (<Link to={`/profile/${profile.username}`} className="nav-item nav-link"><i className="fas fa-user-ninja"></i> Profile</Link>)
//       : (<Link to="/new-profile" className="nav-item nav-link"><i className="fas fa-user-ninja"></i> Profile</Link>);

//     return (
//       <div className={carousel ? ('Navbar h-100') : ('Navbar')}>
//         <div className="navbar navbar-expand-lg navbar-dark bg-dark d-flex flex-column p-0 h-100">

//           {carousel ? (<HomeCarousel />) : ('')}
//           {carousel ? (<div className="carousel-backdrop position-absolute"></div>) : ('')}
//           {hero ? (<NavbarHero heroUrl={heroUrl} />) : ('')}

//           <div className={carousel ? ('HomeNavbar container position-absolute') : ('HomeNavbar container position-absolute')}>
//             <Link to="/home" className="font-weight-bold text-aqua navbar-brand"><img className="logo" src={logo} alt="" /> To0nscape</Link>
//             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
//               <div className="navbar-nav">
//                 {authed ? (profileLink) : ('')}
//                 {/* {authed ? (<Link to="/leaderboards" className="nav-item nav-link"><i className="fas fa-palette"></i> About Us</Link>) : ('')} */}
//                 {authed ? (<Link to="/leaderboards" className="nav-item nav-link"><i className="fas fa-sliders-h"></i> Leaderboards</Link>) : ('')}
//                 {/* {authed ? (<Link to="/leaderboards" className="nav-item nav-link"><i className="fas fa-newspaper"></i> Forums</Link>) : ('')} */}
//                 {authed ? (<span className="nav-item nav-link" onClick={this.logout}><i className="fas fa-bed"></i> Logout</span>) : ('')}
//                 {!authed ? (<span className="nav-item nav-link" onClick={this.login}><i className="fab fa-google"></i> Sign In</span>) : ('')}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

export default Navigation;
