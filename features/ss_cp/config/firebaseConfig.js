// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "studysphere-552d8.firebaseapp.com",
  projectId: "studysphere-552d8",
  storageBucket: "studysphere-552d8.appspot.com",
  messagingSenderId: "196350657890",
  appId: "1:196350657890:web:9590671a1af80e6138983b",
  measurementId: "G-TF1WHWTHYC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
