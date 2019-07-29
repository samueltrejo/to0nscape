import React from 'react';

import AboutCards from './about-cards';

import abouts from '../helpers/about.json';
import aboutHeader from '../images/about.jpg';

class HomeAbout extends React.Component {
  render() {
    const writeGameCards = abouts.map(about => (
      <AboutCards key={about.id} game={about} />
    ));
    return (
      <div className="HomeAbout mt-6">
        <div className="home-heading mb-5 position-relative" style={{ backgroundImage: `url(${aboutHeader})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
          <div className="backdrop">
            <div className="container lead text-white pt-3">About</div>
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
