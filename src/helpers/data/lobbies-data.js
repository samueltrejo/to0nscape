import axios from 'axios';
import fbconfig from '../fbconfig.json';

const databaseUrl = fbconfig.databaseURL;

// const getMyProfile = uid => new Promise((resolve, reject) => {
//   axios.get(`${databaseUrl}/profiles.json?orderBy="uid"&equalTo="${uid}"`)
//     .then((response) => {
//       let profile = {};
//       if (response.data !== null) {
//         Object.keys(response.data).forEach((profileKey) => {
//           response.data[profileKey].id = profileKey;
//           profile = response.data[profileKey];
//         });
//         resolve(profile);
//       }
//     })
//     .catch(error => reject(error));
// });

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

// const getLobby = lobbyCode => axios.get(`${databaseUrl}/lobbies/${lobbyCode}.json`);

const createLobby = lobby => axios.post(`${databaseUrl}/lobbies.json`, lobby);

const updateLobby = (lobby, lobbyId) => axios.put(`${databaseUrl}/lobbies/${lobbyId}.json`, lobby);

// const updateProfile = (profileId, profile) => axios.put(`${databaseUrl}/profiles/${profileId}.json`, profile);

// const deleteProfile = profileId => axios.delete(`${databaseUrl}/profiles/${profileId}.json`);

export default { getLobby, createLobby, updateLobby };
