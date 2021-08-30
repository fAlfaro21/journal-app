import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

//console.log(process.env);

//PARA DESARROLLO
export const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
};

// //PARA TESTING
// const firebaseConfigTesting = {
//   apiKey: "AIzaSyCoOmtra5ckFJNXoBJIjGj2kxxgW7MLxt0",
//   authDomain: "urban-monsters-fagr.firebaseapp.com",
//   databaseURL: "https://urban-monsters-fagr-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "urban-monsters-fagr",
//   storageBucket: "urban-monsters-fagr.appspot.com",
//   messagingSenderId: "796778185874",
//   appId: "1:796778185874:web:bc4deb44d3fa838bb7d24b"
// };

// //Con esto se el environment en el que se esta ejecutando mi app
// //console.log(process.env);

// //Aqui agrego configuraciones para el uso de environments
// if( process.env.NODE_ENV === 'test' ) {
//   // Conf. Base de datos Testing
//   firebase.initializeApp(firebaseConfigTesting);
// } else {
  // Conf. Base de datos Desarrollo
  //firebase.initializeApp(firebaseConfig);
//}

firebase.initializeApp(firebaseConfig);

//Referencia a la base de datos
const db = firebase.firestore();

//Esto es para poder autenticarse con Google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  firebase
}