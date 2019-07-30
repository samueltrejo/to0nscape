import React from 'react';

class LoadingScreen extends React.Component {
  render() {
    return (
      <div className="LoadingScreen vh-100 d-flex justify-content-center align-items-center flex-column">
          <div className="posititon-relative loading-page-container">
            <div className="loading-circle1 position-absolute rounded-circle">
              <div className="dot"></div>
            </div>
          </div>
      </div>
    );
  }
}

export default LoadingScreen;
