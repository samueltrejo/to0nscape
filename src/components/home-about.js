import React from 'react';

import AboutCards from './about-cards';

import abouts from '../helpers/about.json';
import aboutHeader from '../images/about.jpg';
import aboutImage1 from '../images/about-card1.jpg';
import aboutImage2 from '../images/about-card2.jpg';
import aboutImage3 from '../images/about-card3.jpg';

class HomeAbout extends React.Component {
  render() {
    const aboutImages = { aboutImage1, aboutImage2, aboutImage3 };
    const writeGameCards = abouts.map(about => (
      <AboutCards key={about.id} game={about} aboutImages={aboutImages} />
    ));
    return (
      <div className="HomeAbout mt-6">
        <div className="home-heading mb-5 position-relative" style={{ backgroundImage: `url(${aboutHeader})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
          <div className="backdrop">
            <div className="container display-4 text-white pt-3">About</div>
          </div>
        </div>


        <div className="container">
          <div className="row">
            {writeGameCards}
          </div>
        </div>
      </div>
    );
  }
}

export default HomeAbout;
