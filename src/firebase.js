import firebase from "firebase/app";
import "firebase/firebase-firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjmllqh-ctkdKhY6vgbRu5QmVUvvoLJ_E",
  authDomain: "vue-crud-dd0ed.firebaseapp.com",
  projectId: "vue-crud-dd0ed",
  storageBucket: "vue-crud-dd0ed.appspot.com",
  messagingSenderId: "350734050660",
  appId: "1:350734050660:web:9393774021a43dda6fc671",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db,auth };
