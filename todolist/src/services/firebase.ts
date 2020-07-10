import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

let config ={
    apiKey: "AIzaSyDwGnA_Qp4BS5fGqKL250-HPyv5BvYGQh0",
    authDomain: "todolist-24252.firebaseapp.com",
    databaseURL: "https://todolist-24252.firebaseio.com",
    projectId: "todolist-24252",
    storageBucket: "todolist-24252.appspot.com",
    messagingSenderId: "619714024992",
    appId: "1:619714024992:web:3552910e56aacf94190e45"
  };

  firebase.initializeApp(config)

  export const authRef = firebase.auth()
  export const dbRef = firebase.firestore()
  export const storeRef = firebase.storage()