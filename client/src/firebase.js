import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC1k2jvET9C5V0HXrfjUH_5O4oOnJal7xU",
  authDomain: "produhacks-47534.firebaseapp.com",
  projectId: "produhacks-47534",
  storageBucket: "produhacks-47534.appspot.com",
  messagingSenderId: "292582838447",
  appId: "1:292582838447:web:b3e2a142787cbbb4a8845a",
  measurementId: "G-TJP2VE5WQQ",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

export { storage, database };
