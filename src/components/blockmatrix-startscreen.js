import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from './navbar';

class BlockMatrixStartscreen extends React.Component {
  render() {
    return (
      <div className="BlockMatrixStartscreen">
        <Navbar />
        <div id="start-screen" className="col-4 mx-auto mt-5">
          <div className="modal-content">
            <h1 className="display-4 mx-auto mb-0 mt-3">Block Matrix</h1>
            <h6 className="m-auto">by <a className="text-muted" href="https://github.com/samueltrejo" target="blank">@samueltrejo</a></h6>
            <div className="modal-body">
              <div className="text-center">Use left and right arrows to dodge the obstacles. Have fun!</div>
            </div>
            <div className="modal-footer justify-content-center flex-column">
              <Link to="/blockmatrix" type="button" className="btn btn-dark rounded">Start Game</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BlockMatrixStartscreen;
