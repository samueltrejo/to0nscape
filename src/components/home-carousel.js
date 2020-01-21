import React from 'react';

import imageFrame from '../images/image-frame.jpg';
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
              <div className="carousel-item active h-100" style={{ backgroundImage: `url(${homeImage1})`, backgroundPosition: 'center top', backgroundSize: 'cover' }}>
                <img src={imageFrame} className="carousel-image w-100 h-100" alt="by JESHOOTS.COM on Unsplash" onLoad={this.props.contentLoaded} />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Welcome to To0nscape!</h5>
                  <p>{this.state.randomJoke1.setup}</p>
                  <p>{this.state.randomJoke1.punchline}</p>
                </div>
              </div>
              <div className="carousel-item h-100" style={{ backgroundImage: `url(${homeImage2})`, backgroundPosition: 'center top', backgroundSize: 'cover' }}>
                <img src={imageFrame} className="carousel-image w-100 h-100" alt="by Sean Do on Unsplash" onLoad={this.props.contentLoaded} />
                <div className="carousel-caption d-none d-md-block">
                  <h5>This app has 1 minigame at the moment.</h5>
                  <p>{this.state.randomJoke2.setup}</p>
                  <p>{this.state.randomJoke2.punchline}</p>
                </div>
              </div>
              <div className="carousel-item h-100" style={{ backgroundImage: `url(${homeImage3})`, backgroundPosition: 'center top', backgroundSize: 'cover' }}>
                <img src={imageFrame} className="carousel-image w-100 h-100" alt="by Florian Olivo on Unsplash" onLoad={this.props.contentLoaded} />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Enjoy the jokes, create a profile and have fun!</h5>
                  <p>{this.state.randomJoke3.setup}</p>
                  <p>{this.state.randomJoke3.punchline}</p>
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
