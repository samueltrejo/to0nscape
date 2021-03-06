import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import profileData from '../helpers/data/profile-data';
import scoresData from '../helpers/data/scores-data';

class ProfileScores extends React.Component {
  state = {
    profile: {},
    scores: [],
    scoreCategories: [],
    scoreCategory: 'Block Matrix',
  }

  getMyProfile = () => {
    if (this.props.authed) {
      const { uid } = firebase.auth().currentUser;
      profileData.getMyProfile(uid)
        .then(profile => this.setState({ profile }))
        .catch(error => console.error(error));
    }
  }

  getScores = () => {
    scoresData.getScores()
      .then((scores) => {
        this.setState({ scores });
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
    const writeScoreCategories = scoreCategories.map(category => (
      <span key={category} className="dropdown-item" onClick={this.setScoreCategory}>{category}</span>
    ));
    const writeScores = scores.map((score) => {
      let scoreElement = '';
      if (score.game.includes(scoreCategory)) {
        scoreElement = <li key={score.id} className="list-group-item">{score.username}, {score.score}</li>;
      }
      return scoreElement;
    });
    return (
      <div className="ProfileScores mt-3">
        <div className="lead text-center"><strong>My Scores</strong></div>

        <div className="container mt-5">
          <div className="card">
            <div className="card-body">
              <div className="dropdown">
            <h5 className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="border-bottom border-dark">{scoreCategory}</span>
            </h5>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {writeScoreCategories}
            </div>
          </div>
            </div>
            <ul className="list-group list-group-flush">
              {writeScores}
            </ul>
            <div className="card-body"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileScores;
