import React from 'react';

class LoadingScreen extends React.Component {
  render() {
    return (
      <div className="loading-page-container">
        <div className="loading-circle1">
          <div className="dot"></div>
        </div>
        <div className="loading-circle2">
          <div className="dot"></div>
        </div>
        <div className="loading-circle3">
          <div className="dot"></div>
        </div>
        <div className="loading-circle4">
          <div className="dot"></div>
        </div>
      </div>
    );
  }
}

export default LoadingScreen;
