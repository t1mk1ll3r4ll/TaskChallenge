import firebase from "firebase";
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDbsJGbATEwxzlvtrsRUoiGrHC-SF1iuKA",
  authDomain: "challenge-d87fe.firebaseapp.com",
  projectId: "challenge-d87fe",
  storageBucket: "challenge-d87fe.appspot.com",
  messagingSenderId: "633184499800",
  appId: "1:633184499800:web:7df1d2bae671b4c6ec322d",
  measurementId: "G-XBMDDMJY4Z",
  databaseURL: "https://challenge-d87fe-default-rtdb.firebaseio.com/",
};

export default function firebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
}
