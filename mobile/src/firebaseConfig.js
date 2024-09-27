// src/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Reemplaza estos valores con los de tu proyecto de Firebase
const firebaseConfig = {
 apiKey: "AIzaSyDlxIcN5HO4MRy2V44J3z-ZCp8rW_EzzZs",
  authDomain: "my-finance-e343a.firebaseapp.com",
  projectId: "my-finance-e343a",
  storageBucket: "my-finance-e343a.appspot.com",
  messagingSenderId: "254048322997",
  appId: "1:254048322997:web:28cca428152982a91445fc",
  measurementId: "G-G4KQY7HRYW"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa y exporta Firestore
const db = getFirestore(app);

export { db };
