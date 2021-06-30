import firebase from "firebase";
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyACby9Q7Dfw6qZWYJ8nNX8lLJwM8TK-RQM",
  authDomain: "taskchallenge-111c6.firebaseapp.com",
  databaseURL: "https://taskchallenge-111c6-default-rtdb.firebaseio.com",
  projectId: "taskchallenge-111c6",
  storageBucket: "taskchallenge-111c6.appspot.com",
  messagingSenderId: "351672149678",
  appId: "1:351672149678:web:f2d54e281a6f9bf453ef3f",
  measurementId: "G-XBMDDMJY4Z",
};

export default function firebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
}
