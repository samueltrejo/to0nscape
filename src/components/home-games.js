import React from 'react';

import GameCards from './game-cards';

import games from '../helpers/games.json';
import gamesHeader from '../images/games.jpg';
import gameImage1 from '../images/games-card1.jpg';
import gameImage2 from '../images/games-card2.jpg';
import gameImage3 from '../images/games-card3.jpg';

class HomeGames extends React.Component {
  render() {
    const gameImages = { gameImage1, gameImage2, gameImage3 };
    const writeGameCards = games.map(game => (
      <GameCards key={game.id} game={game} gameImages={gameImages} />
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
