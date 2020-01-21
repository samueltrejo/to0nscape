import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import initFirebase from './helpers/firebase-init';

import profileData from './helpers/data/profile-data';

import Home from './components/home';
import NewProfile from './components/new-profile';
import MyProfile from './components/my-profile';
import BlockMatrixStartscreen from './components/blockmatrix-startscreen';
import BlockMatrix from './components/blockmatrix';
import BlockMatrixMultiplayer from './components/blockmatrix-multiplayer';
import Leaderboards from './components/leaderboards';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './styles/app.scss';

initFirebase();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component authed={authed} {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component authed={authed} {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    profile: null,
  }

  getProfile = () => {
    if (this.state.authed) {
      const { uid } = firebase.auth().currentUser;
      console.error(uid)
      profileData.getMyProfile(uid)
        .then((profile) => {
          console.error(profile);
          this.setState({ profile });
        })
        .catch(error => console.error(error));
    }
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
        this.getProfile();
      } else {
        this.setState({ authed: false, profile: null });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, profile } = this.state;

    return (
      <div className="App h-100">
        <BrowserRouter>
          <React.Fragment>
            <Switch>
              <PublicRoute path="/auth" component={Home} authed={authed} profile={profile} />
              <PrivateRoute path="/home" component={Home} authed={authed} profile={profile} />

              <PrivateRoute path="/leaderboards" component={Leaderboards} authed={authed} profile={profile} />
              <PrivateRoute path="/new-profile" component={NewProfile} authed={authed} profile={profile} />
              <PrivateRoute path="/profile/:username" component={MyProfile} authed={authed} profile={profile} getProfile={this.getProfile} />
              <PrivateRoute path="/blockmatrix-startscreen" component={BlockMatrixStartscreen} authed={authed} profile={profile} />
              <PrivateRoute path="/blockmatrix/:lobby" component={BlockMatrixMultiplayer} authed={authed} profile={profile} />
              <PrivateRoute path="/blockmatrix" component={BlockMatrix} authed={authed} profile={profile} />

              <Redirect from="*" to="/auth" />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
