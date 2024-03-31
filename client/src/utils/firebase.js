import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCgyw5wYQi7onjDAE1rRWW2Gfk8ABe3ZQA",
    authDomain: "fitnessshop-ad4c3.firebaseapp.com",
    projectId: "fitnessshop-ad4c3",
    storageBucket: "fitnessshop-ad4c3.appspot.com",
    messagingSenderId: "864114929664",
    appId: "1:864114929664:web:44038d8040479921d028e5",
    measurementId: "G-01CC3T3945"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore;
export const auth = firebase.auth();
export default firebase;