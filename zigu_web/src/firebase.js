import {getAnalytics} from 'firebase/analytics';
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBy6r9Is6VFVVUYge2IENV6NF2kFaJamlw',
  authDomain: 'ziguwebapp.firebaseapp.com',
  projectId: 'ziguwebapp',
  storageBucket: 'ziguwebapp.firebasestorage.app',
  messagingSenderId: '97833466329',
  appId: '1:97833466329:web:30084febeb0b268a3e01c8',
  measurementId: 'G-D1N8BMD4JQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {analytics};
