import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1k2jvET9C5V0HXrfjUH_5O4oOnJal7xU",
  authDomain: "produhacks-47534.firebaseapp.com",
  projectId: "produhacks-47534",
  storageBucket: "produhacks-47534.appspot.com",
  messagingSenderId: "292582838447",
  appId: "1:292582838447:web:b3e2a142787cbbb4a8845a",
  measurementId: "G-TJP2VE5WQQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
