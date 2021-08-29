import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB9fobLANAUwNv-iWiSvRtyQD40tshWm9g",
  authDomain: "react-apps-69a36.firebaseapp.com",
  projectId: "react-apps-69a36",
  storageBucket: "react-apps-69a36.appspot.com",
  messagingSenderId: "1074909114134",
  appId: "1:1074909114134:web:4f22d1aaa35c8f270f6a37",
  measurementId: "G-3FYFZR26H9"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}