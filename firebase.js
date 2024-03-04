// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA3zOUbRHiBfeZ-nM8dbd_H_LtrDUN1VGs',
  authDomain: 'health-chat-859d5.firebaseapp.com',
  projectId: 'health-chat-859d5',
  storageBucket: 'health-chat-859d5.appspot.com',
  messagingSenderId: '1033495204956',
  appId: '1:1033495204956:web:c5356a5f5c3b9494d34299',
  measurementId: 'G-84TTZPLV1D',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
