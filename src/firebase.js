import firebase from "firebase/app";
require("firebase/auth");
require("firebase/firestore");
const config = {
  //TODO: pass to environment variables
  apiKey: "AIzaSyCAsXpFCFSJW3WVVCYpR16-dGkWbLOX6AA",
  authDomain: "rosbank-d6246.firebaseapp.com",
  databaseURL: "https://rosbank-d6246.firebaseio.com",
  projectId: "rosbank-d6246",
  storageBucket: "rosbank-d6246.appspot.com",
  messagingSenderId: "354149397702"
};
firebase.initializeApp(config);
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
export { auth, db, provider };
