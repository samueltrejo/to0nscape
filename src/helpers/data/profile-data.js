import axios from 'axios';
import fbconfig from '../fbconfig.json';

const databaseUrl = fbconfig.databaseURL;

const getMyProfile = uid => new Promise((resolve, reject) => {
  axios.get(`${databaseUrl}/profiles.json?orderBy="uid"&equalTo="${uid}"`)
    .then(response => resolve(Object.values(response.data)))
    .catch(error => reject(error));
});

export default { getMyProfile };
