import React from 'react';

import homeImage1 from '../images/home1.jpg';
import homeImage2 from '../images/home2.jpg';
import homeImage3 from '../images/home3.jpg';

class HomeCarousel extends React.Component {
  render() {
    return (
      <div className="mx-0 h-100">
        <div className="bd-example h-100">
          <div id="carouselExampleCaptions" className="carousel slide h-100" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner h-100">
              <div className="carousel-item active h-100" style={{ backgroundImage: `url(${homeImage2})`, backgroundPosition: 'center top', backgroundSize: 'cover' }}>
                <img src={homeImage1} className="carousel-image w-100 h-100" alt="by JESHOOTS.COM on Unsplash" onLoad={this.props.contentLoaded} />
                <div className="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </div>
              </div>
              <div className="carousel-item h-100" style={{ backgroundImage: `url(${homeImage1})`, backgroundPosition: 'center top', backgroundSize: 'cover' }}>
                <img src={homeImage2} className="carousel-image w-100 h-100" alt="by Sean Do on Unsplash" onLoad={this.props.contentLoaded} />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Second slide label</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </div>
              <div className="carousel-item h-100" style={{ backgroundImage: `url(${homeImage3})`, backgroundPosition: 'center top', backgroundSize: 'cover' }}>
                <img src={homeImage3} className="carousel-image w-100 h-100" alt="by Florian Olivo on Unsplash" onLoad={this.props.contentLoaded} />
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
    );
  }
}

export default HomeCarousel;
