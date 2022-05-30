// import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyC0VPWOmTZGxCOedKU_QVjRvtOvsPX-cPg",
  authDomain: "letmeask-projetinho-8b982.firebaseapp.com",
  databaseURL: "https://letmeask-projetinho-8b982-default-rtdb.firebaseio.com",
  projectId: "letmeask-projetinho-8b982",
  storageBucket: "letmeask-projetinho-8b982.appspot.com",
  messagingSenderId: "833859906336",
  appId: "1:833859906336:web:010e067277d2bbb5748545"
};

// const firebaseConfig = {
//     apiKey: "AIzaSyC0VPWOmTZGxCOedKU_QVjRvtOvsPX-cPg",//process.env.REACT_APP_API_KEY,
//     authDomain:process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID,
  // };

// firebase.initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);

// const auth = firebase.auth();
// const database = firebase.database();

const auth = getAuth(firebaseApp);
export { auth }
// export { auth, database, firebase}