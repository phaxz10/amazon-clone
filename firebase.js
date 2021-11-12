import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCtHc0z0_jVOB__IO3BdcmTrhlI9cu2Bgo',
  authDomain: 'clone-5ff98.firebaseapp.com',
  projectId: 'clone-5ff98',
  storageBucket: 'clone-5ff98.appspot.com',
  messagingSenderId: '172513079850',
  appId: '1:172513079850:web:dd86515cdc0fd7b8238953',
  measurementId: 'G-54XH8448TB',
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
