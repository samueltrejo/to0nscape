import React from 'react';
import { Link } from 'react-router-dom';

class GameCard extends React.Component {
  render() {
    const { game } = this.props;

    return (
      <div className="GameCard col-md-6 col-lg-4 mb-4">
        <div className="card border-0 rounded-0 box-shadow">
          <img src={game.image} className="game-image card-img rounded-0" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{game.name}</h5>
            <p className="card-text">{game.description}</p>
            <Link className="text-dark" to={game.link}><i className="fas fa-gamepad fs-2"></i></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default GameCard;
