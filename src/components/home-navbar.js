import React from 'react';
import { Link } from 'react-router-dom';

class HomeNavbar extends React.Component {
  render() {
    const { authed } = this.props;

    return (
      <div>
        <div className="navbar navbar-expand-lg navbar-dark bg-dark d-flex flex-column p-0">

          <div className="container">
            <div className="bd-example">
              <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                  <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                  <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                  <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="https://i.imgur.com/oSCGWEt.jpg" className="carousel-image d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>First slide label</h5>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img src="https://i.imgur.com/tYvpx9E.jpg" className="carousel-image d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Second slide label</h5>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img src="https://i.imgur.com/TddKAM6.jpg" className="carousel-image d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Third slide label</h5>
                      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </div>
                  </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>

          <div className="backdrop position-absolute"></div>

          <div className="container position-absolute p-5">
            <span className="navbar-brand">To0nscape</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                {authed ? (<Link to="/profile" className="nav-item nav-link">Profile</Link>) : ('')}
                <Link to="/leaderboards" className="nav-item nav-link">Leaderboards</Link>
                {authed ? (<span className="nav-item nav-link">Logout</span>) : ('')}
                {!authed ? (<span className="nav-item nav-link">Sign In</span>) : ('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeNavbar;
