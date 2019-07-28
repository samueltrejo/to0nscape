import React from 'react';
import { Link } from 'react-router-dom';

class GameCard extends React.Component {
  render() {
    const { game } = this.props;

    return (
      <div className="GameCard col-md-6 col-lg-4 mb-4">
        <div className="card border-0 rounded-0 box-shadow">
          <img src={game.image} className="home-images card-img rounded-0" alt="..." />
        </div>
        <div className="card-body">
          <div className="d-flex align-items-center">
            <Link className="btn text-aqua d-flex align-items-center p-0 mr-1" to={game.link}><i className="fas fa-gamepad fs-2"></i></Link>
            <h5 className="card-title font-weight-bold mb-0">{game.name}</h5>
          </div>
          <p className="card-text">{game.description}</p>
        </div>
      </div>
    );
  }
}

export default GameCard;
