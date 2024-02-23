import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCq9592oxey2ty7_fQ542klygBiWwovzWw",
  authDomain: "proyectoppp-cf6fe.firebaseapp.com",
  projectId: "proyectoppp-cf6fe",
  storageBucket: "proyectoppp-cf6fe.appspot.com",
  messagingSenderId: "269420165527",
  appId: "1:269420165527:web:8154466e5070c43170acd2",
  measurementId: "G-QVQ9C0N3XM"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);