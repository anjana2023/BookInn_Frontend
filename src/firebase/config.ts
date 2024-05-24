import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyBuRF7KVdnsbTIhChP3jitENk5fczAr520",
    authDomain: "bookinn-43ad1.firebaseapp.com",
    projectId: "bookinn-43ad1",
    storageBucket: "bookinn-43ad1.appspot.com",
    messagingSenderId: "717541754523",
    appId: "1:717541754523:web:2843a16f726b4f5113e83e",
    measurementId: "G-LCTX9E0DQD"
  };
  
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth=getAuth(app)
const googleProvider=new GoogleAuthProvider();
export {auth,googleProvider}

