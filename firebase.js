// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { initializeApp, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
//import firebaseConfig from "./config/firebaseConfig";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLuOVZiuSMyrQ33N-9Y8yTqilLafi_erk",
  authDomain: "gp-auth-670ed.firebaseapp.com",
  projectId: "gp-auth-670ed",
  storageBucket: "gp-auth-670ed.appspot.com",
  messagingSenderId: "58046325267",
  appId: "1:58046325267:web:a5de58ba094c8ac51ed5e6"
};

const app = initializeApp (firebaseConfig);
const auth = initializeAuth(app);
export {auth};
export default firebaseConfig;


