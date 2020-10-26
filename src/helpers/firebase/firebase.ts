
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyC5POoFt8b96cmTFhB_Uo910YZNJcU7hMI",
    authDomain: "mini-project-a8159.firebaseapp.com",
    databaseURL: "https://mini-project-a8159.firebaseio.com",
    projectId: "mini-project-a8159",
    storageBucket: "mini-project-a8159.appspot.com",
    messagingSenderId: "647495386470",
    appId: "1:647495386470:web:b2203758013b77ce97f4a7"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const google = new firebase.auth.GoogleAuthProvider();