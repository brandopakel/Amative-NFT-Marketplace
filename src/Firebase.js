// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPwYYuB4aj_pjwnkZp-aTbnbWFlsEDmEI",
  authDomain: "amativelockedpage.firebaseapp.com",
  databaseURL: "https://amativelockedpage-default-rtdb.firebaseio.com",
  projectId: "amativelockedpage",
  storageBucket: "amativelockedpage.appspot.com",
  messagingSenderId: "432600109537",
  appId: "1:432600109537:web:a999cfa053720cac4242a0",
  measurementId: "G-HE2W3N9K7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;