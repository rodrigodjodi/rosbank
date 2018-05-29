import firebase from "firebase/app";
import "firebase/auth";
// import "firebase/database";
const config = { //TODO: pass to environment variables
  apiKey: "AIzaSyCAsXpFCFSJW3WVVCYpR16-dGkWbLOX6AA",
  authDomain: "rosbank-d6246.firebaseapp.com",
  databaseURL: "https://rosbank-d6246.firebaseio.com",
  projectId: "rosbank-d6246",
  storageBucket: "rosbank-d6246.appspot.com",
  messagingSenderId: "354149397702"
};
export const app = firebase.initializeApp(config);
//export const auth = app.auth();
