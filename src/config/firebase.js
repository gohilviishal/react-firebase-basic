import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDBJ3upWRe72uN_LXI07g8lgXB_Zu105E",
  authDomain: "fir-course-38e61.firebaseapp.com",
  projectId: "fir-course-38e61",
  storageBucket: "fir-course-38e61.firebasestorage.app",
  messagingSenderId: "1029637787528",
  appId: "1:1029637787528:web:1e86d5ea9e101c3b25f43d",
  measurementId: "G-RVG6LKHDEX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app)