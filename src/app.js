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
// import Profile from './components/profile';
import NewProfile from './components/new-profile';
import MyProfile from './components/my-profile';
import BlockMatrixStartscreen from './components/blockmatrix-startscreen';
import BlockMatrix from './components/blockmatrix';
import Leaderboards from './components/leaderboards';

import './styles/app.scss';

initFirebase();

const PublicRoute = ({ component: Component, authed, profile, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component authed={authed} profile={profile} {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, profile, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component authed={authed} profile={profile} {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    profile: [],
  }

  getMyProfile = () => {
    const { uid } = firebase.auth().currentUser;
    profileData.getMyProfile(uid)
      .then(profile => this.setState({ profile }))
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
        this.getMyProfile();
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, profile } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <Switch>
              <PublicRoute path="/auth" component={Home} authed={authed} />
              <PrivateRoute path="/home" component={Home} authed={authed} profile={profile} />

              <PrivateRoute path="/leaderboards" component={Leaderboards} authed={authed} />
              <PrivateRoute path="/new-profile" component={NewProfile} authed={authed} />
              <PrivateRoute path="/profile/:username" component={MyProfile} authed={authed} />
              {/* <PrivateRoute path="/profile" component={Profile} authed={authed} /> */}
              <PrivateRoute path="/blockmatrix-startscreen" component={BlockMatrixStartscreen} authed={authed} />
              <PrivateRoute path="/blockmatrix" component={BlockMatrix} authed={authed} />

              <Redirect from="*" to="/auth" />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
