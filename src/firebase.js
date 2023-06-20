


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBS3_h8LcUu6ZplxadGlRcPt68emfMBwC8",
    authDomain: "surveys-46863.firebaseapp.com",
    projectId: "surveys-46863",
    storageBucket: "surveys-46863.appspot.com",
    messagingSenderId: "938303945625",
    appId: "1:938303945625:web:d290813d75c57f4f21b108",
    measurementId: "G-LZ8ZMVZRZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { analytics, auth, db };
