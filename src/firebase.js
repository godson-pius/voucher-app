import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyB7aexERaMuWAyHKlot6iulFb_n88rrpjI",
    authDomain: "voucherappl.firebaseapp.com",
    databaseURL: "https://voucherappl-default-rtdb.firebaseio.com",
    projectId: "voucherappl",
    storageBucket: "voucherappl.appspot.com",
    messagingSenderId: "838198980832",
    appId: "1:838198980832:web:fa2b89914f0e6465306085"
  };
  // Initialize Firebase
  const fireDb = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = fireDb.database().ref()

export {auth, db}