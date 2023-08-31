// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAiGm5xTApdSgn4QRUk2rYBcCkeJiGqwNU",
    authDomain: "looffiz-demo.firebaseapp.com",
    projectId: "looffiz-demo",
    storageBucket: "looffiz-demo.appspot.com",
    messagingSenderId: "31311498081",
    appId: "1:31311498081:web:1d53288351eaf7d4cf5320"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);


const auth = getAuth(app);

const GAuthProvider = new GoogleAuthProvider();

export { auth, GAuthProvider }
