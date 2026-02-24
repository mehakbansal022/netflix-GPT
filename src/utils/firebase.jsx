// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLFAVqpvXy1cfjE_iHpPMw-5NW2txzkqA",
  authDomain: "netflixgpt-32e4e.firebaseapp.com",
  projectId: "netflixgpt-32e4e",
  storageBucket: "netflixgpt-32e4e.firebasestorage.app",
  messagingSenderId: "643192610814",
  appId: "1:643192610814:web:d06b68f1b6416616c02aaf",
  measurementId: "G-T1652H2R85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();