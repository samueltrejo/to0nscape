// Firebase Connection Instructions
// This application uses firebase, you will need to connect it to be able to run locally.
// 1. Navigate to https://console.firebase.google.com/
// 2. Create a project and under Authentication > Sign-in method enable Google Authentication
// 3. Create a realtime database and paste these rules:
//      {
//        "rules": {
//          ".read": true,
//          ".write": true,
//          "profiles": {
//              ".indexOn": "uid"
//            },
//          "lobbies": {
//              ".indexOn": "lobbyCode"
//            }
//        }
//      }
// 4. Go to project settings and under your apps grab config keys and paste into fields below
// 5. Rename this file to 'fbconfig.js'

export default {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};
