import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChIzxI9h3ogo700rLlslY6T9WOHc54xZE",
  authDomain: "movio-app-2d48f.firebaseapp.com",
  projectId: "movio-app-2d48f",
  storageBucket: "movio-app-2d48f.appspot.com",
  messagingSenderId: "608204320255",
  appId: "1:608204320255:web:0baac80bc707e106334bca",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
