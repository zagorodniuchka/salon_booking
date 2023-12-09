import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcbxY5PMKB1u9c7qpY-Gd7hbywnafZfo0",
  authDomain: "salon-booking-771f3.firebaseapp.com",
  projectId: "salon-booking-771f3",
  storageBucket: "salon-booking-771f3.appspot.com",
  messagingSenderId: "1046258768195",
  appId: "1:1046258768195:web:4319d4b1454051afc3f7f6",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export { auth, db };
