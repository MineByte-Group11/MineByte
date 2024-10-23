// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfqyrmQi5BGUHQtRDKvvp7QqJf16ZIRNY",
  authDomain: "minebyte-b2e3c.firebaseapp.com",
  projectId: "minebyte-b2e3c",
  storageBucket: "minebyte-b2e3c.appspot.com",
  messagingSenderId: "46643433288",
  appId: "1:46643433288:web:fbe7dd5f5355c497b1ad7d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
