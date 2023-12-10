import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAHfL8O4HwCBIkdQrcXqMXO4wuS3rftvow",
    authDomain: "typing-master-d5e7b.firebaseapp.com",
    projectId: "typing-master-d5e7b",
    storageBucket: "typing-master-d5e7b.appspot.com",
    messagingSenderId: "938065435475",
    appId: "1:938065435475:web:89af863efa3e14fb54dfa6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()