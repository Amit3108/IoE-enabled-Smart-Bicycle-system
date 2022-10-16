//import firebase from 'firebase';
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyD5KXSFqhVUcS4P8TwOh-lWdXt8kzSG5fk",
    authDomain: "smart-bicycle-ioe.firebaseapp.com",
    databaseURL: "https://smart-bicycle-ioe-default-rtdb.firebaseio.com",
    projectId: "smart-bicycle-ioe",
    storageBucket: "smart-bicycle-ioe.appspot.com",
    messagingSenderId: "387531890114",
    appId: "1:387531890114:web:ccc1e462e3228a61efca5b",
    measurementId: "G-4T3X4MW8VT"
  };

//firebase.initializeApp(config);
const app = initializeApp(firebaseConfig);
export default app