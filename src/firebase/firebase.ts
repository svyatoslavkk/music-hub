import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBEOhir-7Qpo2YjCBvGijwa4fBH3HfMhgQ",
  authDomain: "music-hub-1e4a8.firebaseapp.com",
  projectId: "music-hub-1e4a8",
  storageBucket: "music-hub-1e4a8.appspot.com",
  messagingSenderId: "436315145575",
  appId: "1:436315145575:web:e422055bf35d4c5a7a5bc2",
  measurementId: "G-N9EM7MZ6WZ",
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
