import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import 'firebase/database';
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyAShPG40d_hFWMslMHfCg7820sYkYQC-BA",
    authDomain: "tarefas-ce520.firebaseapp.com",
    projectId: "tarefas-ce520",
    storageBucket: "tarefas-ce520.appspot.com",
    messagingSenderId: "718433149969",
    appId: "1:718433149969:web:0d4b18a11713fdf0bf7db0"
};

// Initialize Firebase

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export default firebase;