import React from 'react';
import { Link } from 'react-router-dom';

class GameCard extends React.Component {
  render() {
    const { game } = this.props;

    return (
      <div className="GameCard col-4">
        <div className="card border-0 rounded-0 box-shadow">
          <img src={game.image} class="game-image card-img rounded-0" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{game.name}</h5>
            <p class="card-text">{game.description}</p>
            <Link className="text-dark" to={game.link}><i class="fas fa-gamepad fs-2"></i></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default GameCard;