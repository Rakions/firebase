import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCddE2s7wD2mq3Zh8B3YCQu9VFgRAhUoik",
  authDomain: "prueba-e949e.firebaseapp.com",
  databaseURL: "https://prueba-e949e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "prueba-e949e",
  storageBucket: "prueba-e949e.appspot.com",
  messagingSenderId: "172855996936",
  appId: "1:172855996936:web:1ef42fe50a4ac7ccb2d7bd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);