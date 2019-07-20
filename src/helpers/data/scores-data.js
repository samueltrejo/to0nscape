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

// const getScores = () => new Promise((resolve, reject) => {
//   axios.get(`${databaseUrl}/scores.json?orderBy="uid"&equalTo="${uid}"`)
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

const postScore = score => axios.post(`${databaseUrl}/scores.json`, score);

// const updateProfile = (profileId, profile) => axios.put(`${databaseUrl}/profiles/${profileId}.json`, profile);

// const deleteProfile = profileId => axios.delete(`${databaseUrl}/profiles/${profileId}.json`);

export default { postScore };
