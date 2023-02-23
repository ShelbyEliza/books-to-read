import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyA1fk5EErQPNGAiwKTnXYB9lAS8oN2Loeg",
  authDomain: "under-the-shelf.firebaseapp.com",
  projectId: "under-the-shelf",
  storageBucket: "under-the-shelf.appspot.com",
  messagingSenderId: "675249654431",
  appId: "1:675249654431:web:13404099e6b388da2230aa",
  siteKey: "6LdAPKskAAAAAC97fVNLQH81P0CWqkGUbdRD31Ri",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(firebaseConfig.siteKey),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

const db = getFirestore();
const auth = getAuth();

export { db, auth };
