import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1fk5EErQPNGAiwKTnXYB9lAS8oN2Loeg",
  authDomain: "under-the-shelf.firebaseapp.com",
  projectId: "under-the-shelf",
  storageBucket: "under-the-shelf.appspot.com",
  messagingSenderId: "675249654431",
  appId: "1:675249654431:web:13404099e6b388da2230aa",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { db, auth };
