import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const config = {
  //TODO: pass to environment variables
  apiKey: "AIzaSyCAsXpFCFSJW3WVVCYpR16-dGkWbLOX6AA",
  authDomain: "rosbank-d6246.firebaseapp.com",
  databaseURL: "https://rosbank-d6246.firebaseio.com",
  projectId: "rosbank-d6246",
  storageBucket: "rosbank-d6246.appspot.com",
  messagingSenderId: "354149397702"
};
const app = firebase.initializeApp(config);
const auth = app.auth();
const db = app.firestore();
db.settings({ timestampsInSnapshots: true });
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };
