import axios from 'axios';
import fbconfig from '../fbconfig.json';

const databaseUrl = fbconfig.databaseURL;

const getMyProfile = uid => new Promise((resolve, reject) => {
  axios.get(`${databaseUrl}/profiles.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const profile = [];
      if (response.data !== null) {
        Object.keys(response.data).forEach((profileKey) => {
          response.data[profileKey].id = profileKey;
          profile.push(response.data[profileKey]);
        });
        resolve(profile);
      }
    })
    .catch(error => reject(error));
});

const createProfile = profile => axios.post(`${databaseUrl}/profiles.json`, profile);

const updateProfile = (profileId, profile) => axios.put(`${databaseUrl}/profiles/${profileId}.json`, profile);

const deleteProfile = profileId => axios.delete(`${databaseUrl}/profiles/${profileId}.json`);

export default {
  getMyProfile,
  createProfile,
  updateProfile,
  deleteProfile,
};
