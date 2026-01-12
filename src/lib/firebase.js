import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA72bAZG9vZzIWNKNM4EOSPwXQ88UVAV0o",
    authDomain: "local-issue-reporter-94a97.firebaseapp.com",
    projectId: "local-issue-reporter-94a97",
    storageBucket: "local-issue-reporter-94a97.firebasestorage.app",
    messagingSenderId: "161376814716",
    appId: "1:161376814716:web:216e964891036db9fd2bf9",
    measurementId: "G-B6Q0N1J779"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
