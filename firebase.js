import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "instanext-aed3d.firebaseapp.com",
  projectId: "instanext-aed3d",
  storageBucket: "instanext-aed3d.appspot.com",
  messagingSenderId: "1039821447788",
  appId: "1:1039821447788:web:cedf78bae5564c97fb6e49"
};

// initialize Firebase, use getApps and getApp to prevent multiple initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { app, db, storage };