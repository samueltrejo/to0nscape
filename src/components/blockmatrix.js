import React from 'react';

class BlockMatrix extends React.Component {
  render() {
    return (
      <div className="BlockMatrix p-5 vh-100">
        <div className="game-screen h-100 bg-dark position-relative">
          <div className="player bg-white position-absolute"></div>
        </div>
      </div>
    );
  }
}

export default BlockMatrix;
