// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgp4CYYQgZVxKchcpPYabgqZ5E-ghMd4A",
  authDomain: "jobs-app-36698.firebaseapp.com",
  projectId: "jobs-app-36698",
  storageBucket: "jobs-app-36698.appspot.com",
  messagingSenderId: "851908767635",
  appId: "1:851908767635:web:f350c9041fb3247f6d4266",
  measurementId: "G-Y0J9MBBKKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =getFirestore(app)
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(app); // Initialize Firebase Authentication

export { db, auth,app }

export default firebaseApp;