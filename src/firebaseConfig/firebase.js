// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBph3sD80aG0dnc2q1IVldKIvgbY93HJQg",
  authDomain: "cac-react-23307-deg.firebaseapp.com",
  projectId: "cac-react-23307-deg",
  storageBucket: "cac-react-23307-deg.appspot.com",
  messagingSenderId: "1025194032827",
  appId: "1:1025194032827:web:70cbf49de97b20e251b39e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)