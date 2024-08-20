// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDLYJHClT_6xNSOIiITk2mNvMGuMl5zMM",
  authDomain: "miniproject-dcc7f.firebaseapp.com",
  projectId: "miniproject-dcc7f",
  storageBucket: "miniproject-dcc7f.appspot.com",
  messagingSenderId: "20115313771",
  appId: "1:20115313771:web:8fa66404a4c7a749bf0d2e",
  measurementId: "G-YJDR65QQ7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth ,db };


// # for Expo projects
// npx expo install @react-native-async-storage/async-storage
// to remove the firebase error of async storage
// does not work when we save the firebase file, but works when after saving this file and dismis the warning