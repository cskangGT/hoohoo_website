import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAmFZIC5U_3XBiB7w9CShcTFFi-RzkbOrk',
  authDomain: 'earthmeraofficialwebsite.firebaseapp.com',
  projectId: 'earthmeraofficialwebsite',
  storageBucket: 'earthmeraofficialwebsite.firebasestorage.app',
  messagingSenderId: '71388009584',
  appId: '1:71388009584:web:2b42513055377ba24210b5',
  measurementId: 'G-RKL2JP6Y4G',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export { analytics };

