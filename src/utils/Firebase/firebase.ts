// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN-AIMCrUVeBD6voEBTuUx8NMr6G7rLn0",
  authDomain: "food-application-12182.firebaseapp.com",
  projectId: "food-application-12182",
  storageBucket: "food-application-12182.firebasestorage.app",
  messagingSenderId: "980575929381",
  appId: "1:980575929381:web:1a489d0b6241e9f0a5abcc",
  measurementId: "G-WPEQ28P7SV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();