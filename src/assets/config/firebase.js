import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyDz291Bx4elhtHx-f4HqF_4prluJligX8U",
    authDomain: "olx-pak-istan.firebaseapp.com",
    databaseURL: "https://olx-pak-istan.firebaseio.com",
    projectId: "olx-pak-istan",
    storageBucket: "olx-pak-istan.appspot.com",
    messagingSenderId: "153626770872",
    appId: "1:153626770872:web:2d3181ccea2bfcfdbda34d",
    measurementId: "G-C9HXE9N494"
  };

  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig)