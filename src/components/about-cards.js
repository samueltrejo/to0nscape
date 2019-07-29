import React from 'react';

class AboutCard extends React.Component {
  render() {
    const { game } = this.props;

    return (
      <div className="AboutCard col-md-6 col-lg-4 mb-4">
        <div className="card text-white">
          <img src={game.image} className="home-images card-img rounded-0" alt="..." />
          <div className="card-img-overlay border-0 rounded-0 box-shadow bg-darkopaque">
            <div className="card-body">
              <h5 className="card-title text-aqua">{game.name}</h5>
              <p className="card-text">{game.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutCard;
