// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAI9sRyeeo_ktmgR3ASLdYm7L4q3YkGO88",
  authDomain: "fir-tube-31941.firebaseapp.com",
  projectId: "fir-tube-31941",
  storageBucket: "fir-tube-31941.appspot.com",
  messagingSenderId: "850686370218",
  appId: "1:850686370218:web:a02bc643503eaefba20bd3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(); 