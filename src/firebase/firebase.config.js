// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOubp1UPrzVRTi177IX8oVAFTh0MJ4qUQ",
  authDomain: "web-book-iventory.firebaseapp.com",
  projectId: "web-book-iventory",
  storageBucket: "web-book-iventory.appspot.com",
  messagingSenderId: "125214976528",
  appId: "1:125214976528:web:d4eae153f463f628b87895"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;