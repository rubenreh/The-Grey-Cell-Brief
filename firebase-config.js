// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl4-CR0cDcInzgWnGJMPDHbBn6L1bWlRs",
  authDomain: "grey-cell-brief.firebaseapp.com",
  projectId: "grey-cell-brief",
  storageBucket: "grey-cell-brief.firebasestorage.app",
  messagingSenderId: "479300831529",
  appId: "1:479300831529:web:b295eb7803433fa69acf38",
  measurementId: "G-6GCYXKL6N0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage }; 
