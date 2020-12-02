import { firebase } from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';


const app = {
  apiKey: "AIzaSyAOuGWBpS0ldvAR6JlPLw3Zq71zzlFvtWc",
  authDomain: "mygym-bb579.firebaseapp.com",
  databaseURL: "https://mygym-bb579.firebaseio.com",
  projectId: "mygym-bb579",
  storageBucket: "mygym-bb579.appspot.com",
  messagingSenderId: "102312009132",
  appId: "1:102312009132:web:144cbe01e84561e9df6e09",
  measurementId: "G-PW3Y8H7MH5"
};

if (!firebase.apps.length) {
  firebase.initializeApp(app);
}



export const FirebaseDB = firebase.firestore();
export const FirebaseAutentication = firebase.auth();

