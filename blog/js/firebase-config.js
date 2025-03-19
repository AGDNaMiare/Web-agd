// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBX1fVaI68uf9DXLw0PT4IOjbhY4PsNoPs",
  authDomain: "agdnamiare-f1676.firebaseapp.com",
  projectId: "agdnamiare-f1676",
  storageBucket: "agdnamiare-f1676.firebasestorage.app",
  messagingSenderId: "291506839108",
  appId: "1:291506839108:web:83252fb6915af941eea611",
  measurementId: "G-EYTLCQPQ44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);