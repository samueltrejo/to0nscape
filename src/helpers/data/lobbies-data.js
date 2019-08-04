import axios from 'axios';
import fbconfig from '../fbconfig.json';

const databaseUrl = fbconfig.databaseURL;

const getLobby = lobbyCode => new Promise((resolve, reject) => {
  axios.get(`${databaseUrl}/lobbies.json?orderBy="lobbyCode"&equalTo="${lobbyCode}"`)
    .then((response) => {
      let lobby = {};
      if (response.data !== null) {
        Object.keys(response.data).forEach((lobbyKey) => {
          response.data[lobbyKey].id = lobbyKey;
          lobby = response.data[lobbyKey];
        });
        resolve(lobby);
      }
    })
    .catch(error => reject(error));
});

const createLobby = lobby => axios.post(`${databaseUrl}/lobbies.json`, lobby);

const updateLobby = (lobby, lobbyId) => axios.put(`${databaseUrl}/lobbies/${lobbyId}.json`, lobby);

const deleteLobby = lobbyId => axios.delete(`${databaseUrl}/lobbies/${lobbyId}.json`);

const updateLobbyP1 = (player1Pos, lobbyId) => axios.put(`${databaseUrl}/lobbies/${lobbyId}/player1Pos.json`, player1Pos);
const updateLobbyP2 = (player2Pos, lobbyId) => axios.put(`${databaseUrl}/lobbies/${lobbyId}/player2Pos.json`, player2Pos);
const updateObstacle = (obstacle, lobbyId) => axios.put(`${databaseUrl}/lobbies/${lobbyId}/obstacle.json`, obstacle);

export default {
  getLobby,
  createLobby,
  updateLobby,
  deleteLobby,
  updateLobbyP1,
  updateLobbyP2,
  updateObstacle,
};
