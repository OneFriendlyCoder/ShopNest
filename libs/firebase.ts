// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "shopnest-111f7.firebaseapp.com",
  projectId: "shopnest-111f7",
  storageBucket: "shopnest-111f7.appspot.com",
  messagingSenderId: "280707562238",
  appId: "1:280707562238:web:3cf4f45e7c745511f703af"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
export default firebaseapp;
