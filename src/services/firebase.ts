import * as firebase from 'firebase';

// TODO: fill in your firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDOxhRyc8Q70ugXvrmQE4VCOxOmyNmpYcw",
    authDomain: "weather-guessing-app.firebaseapp.com",
    databaseURL: "https://weather-guessing-app.firebaseio.com",
    projectId: "weather-guessing-app",
    storageBucket: "weather-guessing-app.appspot.com",
    messagingSenderId: "93196976728",
    appId: "1:93196976728:web:c11d675ee95ccd4a8e002d",
  };
firebase.initializeApp(firebaseConfig);

export default firebase;