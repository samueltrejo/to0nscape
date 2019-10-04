import firebase from 'firebase/app';

import fbconfig from './fbconfig';

const initFirebase = () => {
  firebase.initializeApp(fbconfig);
};

export default initFirebase;
