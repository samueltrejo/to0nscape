import React from 'react';
import scoresData from '../helpers/data/scores-data';
import heroUrl from '../images/leaderboards.jpg';

import Navbar from './navbar';
import Footer from './footer';

class Leaderboards extends React.Component {
  state = {
    scores: [],
    scoreCategories: [],
    scoreCategory: 'Block Matrix',
  }

  getScores = () => {
    scoresData.getScores()
      .then((scores) => {
        const sortedScores = scores.sort((a, b) => {
          const scoreA = a.score;
          const scoreB = b.score;

          let comparison = 0;
          if (scoreA > scoreB) {
            comparison = -1;
          } else if (scoreA < scoreB) {
            comparison = 1;
          }
          return comparison;
        });
        this.setState({ scores: sortedScores });
        this.getScoreCategories();
      })
      .catch(error => console.error(error));
  }

  getScoreCategories = () => {
    this.state.scores.forEach((score) => {
      const { scoreCategories } = this.state;
      if (!scoreCategories.includes(score.game)) {
        scoreCategories.push(score.game);
        this.setState({ scoreCategories });
      }
    });
  }

  setScoreCategory = (event) => {
    const category = event.target.textContent;
    this.setState({ scoreCategory: category });
  }

  componentDidMount() {
    this.getMyProfile();
    this.getScores();
  }

  render() {
    const {
      scoreCategories,
      scoreCategory,
      scores,
    } = this.state;
    const { authed, profile } = this.props;
    const writeScoreCategories = scoreCategories.map(category => (
      <span key={category} className="dropdown-item" onClick={this.setScoreCategory}>{category}</span>
    ));
    let counter = 1;
    const writeScores = scores.map((score) => {
      let scoreElement;
      if (score.game.includes(scoreCategory)) {
        scoreElement = <tr key={score.id}><td>{counter}</td><td>{score.username}</td><td>{score.score}</td></tr>;
        counter += 1;
      }
      return scoreElement;
    });
    return (
      <div className="Leaderboards h-100">
        <div className="app-content h-100">
          <Navbar authed={authed} carousel={false} hero={true} profile={profile} heroUrl={heroUrl} />
          <div className="container display-4 pt-3">Leaderboards</div>

          <div className="container mt-5">
            <div className="card bg-dark">
              <div className="card-body">
                <div className="dropdown text-center">
                  <h5 className="btn btn-dark dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="">{scoreCategory}</span>
                  </h5>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {writeScoreCategories}
                  </div>
                </div>

                <table className="table table-dark">
                  <thead>
                    <tr>
                      <th scope="col">Rank</th>
                      <th scope="col">Player</th>
                      <th scope="col">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {writeScores}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Leaderboards;
