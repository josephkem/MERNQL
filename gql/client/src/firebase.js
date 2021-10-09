import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC785vPKYOQsCObFt5mKXhMYo4cXpuG3gw",
  authDomain: "gqlreact-91.firebaseapp.com",
  projectId: "gqlreact-91",
  storageBucket: "gqlreact-91.appspot.com",
  //   messagingSenderId: "1019459432797",
  appId: "1:1019459432797:web:624b37c0cab23f6d7af8b4",
  measurementId: "G-B27FES8LDE",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();

export const googleAuthProvider = new GoogleAuthProvider();
