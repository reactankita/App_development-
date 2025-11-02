// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxdePmnAzmG23GK5YCcH0rensggabFIds",
  authDomain: "fir-crud-b6670.firebaseapp.com",
  projectId: "fir-crud-b6670",
  storageBucket: "fir-crud-b6670.firebasestorage.app",
  messagingSenderId: "530608516539",
  appId: "1:530608516539:web:a8ba75a5b868eb61b0e89e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
