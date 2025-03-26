
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAggG-1W1QNtLz4S22tQM7sVts9Cvy2d7c",
  authDomain: "safeguard-system-7f787.firebaseapp.com",
  projectId: "safeguard-system-7f787",
  storageBucket: "safeguard-system-7f787.firebasestorage.app",
  messagingSenderId: "275626497484",
  appId: "1:275626497484:web:edd5211315222d3ce53969"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth();