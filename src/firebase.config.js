// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9ZAI1PmloM0rtgyZ7M9mvkxDTrORtyNU",
  authDomain: "aulaprogramer.firebaseapp.com",
  projectId: "aulaprogramer",
  storageBucket: "aulaprogramer.appspot.com",
  messagingSenderId: "259293488560",
  appId: "1:259293488560:web:c0f14ca65fefc2ee92a275",
  measurementId: "G-55KWP1N5KM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);