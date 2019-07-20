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

import Home from './components/home';
import NewProfile from './components/new-profile';
import MyProfile from './components/my-profile';
import BlockMatrixStartscreen from './components/blockmatrix-startscreen';
import BlockMatrix from './components/blockmatrix';
import Leaderboards from './components/leaderboards';

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
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <Switch>
              <PublicRoute path="/auth" component={Home} authed={authed} />
              <PrivateRoute path="/home" component={Home} authed={authed} />

              <PrivateRoute path="/leaderboards" component={Leaderboards} authed={authed} />
              <PrivateRoute path="/new-profile" component={NewProfile} authed={authed} />
              <PrivateRoute path="/profile/:username" component={MyProfile} authed={authed} />
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
