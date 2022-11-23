import * as firebase from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAwECCwqdtb31gAfrrrVeEdI4pjIjWFBmo",
  authDomain: "vtapp-70e92.firebaseapp.com",
  projectId: "vtapp-70e92",
  storageBucket: "vtapp-70e92.appspot.com",
  messagingSenderId: "245990873063",
  appId: "1:245990873063:web:f6a8561e8303efaedbcf42",
  measurementId: "G-4ZYJ4FXGC3"
};

// Initialize Firebase
export const app = !firebase.getApps().length ? firebase.initializeApp(firebaseConfig, "vtapp") : firebase.getApp("vtapp");

export const analytics = getAnalytics(app);