import firebase from 'firebase';
import firestore from 'firebase/firestore';
require("firebase/firestore")
require("firebase/firebase-storage")


const firebaseConfig = {
    apiKey: "AIzaSyBsCoR-jrIUJMsdzJHe_ax1E9dplV__bXs",
    authDomain: "react-crud-c75a1.firebaseapp.com",
    projectId: "react-crud-c75a1",
    storageBucket: "react-crud-c75a1.appspot.com",
    messagingSenderId: "105846219248",
    appId: "1:105846219248:web:46a4cd115b87b737897d35"

};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

firebase.firestore();

export default firebase;

