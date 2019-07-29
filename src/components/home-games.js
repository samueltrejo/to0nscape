import React from 'react';

import GameCards from './game-cards';

import games from '../helpers/games.json';
import gamesHeader from '../images/games.jpg';

class HomeGames extends React.Component {
  render() {
    const writeGameCards = games.map(game => (
      <GameCards key={game.id} game={game} />
    ));
    return (
      <div className="HomeGames mt-5">
        <div className="home-heading mb-5 position-relative" style={{ backgroundImage: `url(${gamesHeader})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
          <div className="backdrop">
            <div className="container lead text-white pt-3">Games</div>
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

export default HomeGames;
