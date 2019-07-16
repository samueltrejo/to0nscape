import axios from 'axios';
import fbconfig from '../fbconfig.json';

const databaseUrl = fbconfig.databaseURL;

const getMyProfile = uid => new Promise((resolve, reject) => {
  axios.get(`${databaseUrl}/profiles.json?orderBy="uid"&equalTo="${uid}"`)
    .then(response => resolve(Object.values(response.data)[0]))
    .catch(error => reject(error));
});

const createProfile = profile => axios.post(`${databaseUrl}/profiles.json`, profile);

export default { getMyProfile, createProfile };
