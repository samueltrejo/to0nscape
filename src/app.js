import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Home from './components/home';
import NewProfile from './components/new-profile';
import Profile from './components/profile';
import BlockMatrixStartscreen from './components/blockmatrix-startscreen';
import BlockMatrix from './components/blockmatrix';
import Leaderboards from './components/leaderboards';

import './styles/app.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <Switch>
              <PublicRoute path="/home" component={Home} authed={authed} />
              <PublicRoute path="/leaderboards" component={Leaderboards} authed={authed} />

              <PrivateRoute path="/new-profile" component={NewProfile} authed={authed} />
              <PrivateRoute path="/profile" component={Profile} authed={authed} />
              <PrivateRoute path="/blockmatrix-startscreen" component={BlockMatrixStartscreen} authed={authed} />
              <PrivateRoute path="/blockmatrix" component={BlockMatrix} authed={authed} />

              <Redirect from="*" to="/home" />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
