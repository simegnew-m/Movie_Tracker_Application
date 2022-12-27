import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB9lDH25ySoiX4mYkJYUZDBTOhwH2MvABg",
    authDomain: "movie-tracker-application.firebaseapp.com",
    projectId: "movie-tracker-application",
    storageBucket: "movie-tracker-application.appspot.com",
    messagingSenderId: "972866245678",
    appId: "1:972866245678:web:a8572d0e0db3ab78f3bbbf",
    measurementId: "G-0QLPWEV799"
  };

  const app = initializeApp(firebaseConfig);
  
  export const db = getFirestore();
  export default firebaseConfig;