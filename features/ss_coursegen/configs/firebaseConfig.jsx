// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "coursegen-362aa.firebaseapp.com",
  projectId: "coursegen-362aa",
  storageBucket: "coursegen-362aa.appspot.com",
  messagingSenderId: "332460305142",
  appId: "1:332460305142:web:0a88f5725a75efc762dad7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)