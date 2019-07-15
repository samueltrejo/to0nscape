import React from 'react';

import GameCards from './game-cards';

import games from '../helpers/games.json';

class HomeGames extends React.Component {
  render() {
    const writeGameCards = games.map(game => (
      <GameCards key={game.id} game={game} />
    ));
    return (
      <div className="HomeGames container">
        <div className="lead">Games</div>
        <div className="row">
          {writeGameCards}
        </div>
      </div>
    );
  }
}

export default HomeGames;
