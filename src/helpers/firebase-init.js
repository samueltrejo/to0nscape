import firebase from 'firebase/app';

import fbconfig from './fbconfig.json';

const initFirebase = () => {
  firebase.initializeApp(fbconfig);
};

export default initFirebase;
