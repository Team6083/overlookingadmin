import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


var firebaseConfig = {
    apiKey: "AIzaSyDqGsMpbk3UFSDgJdBTp6hx1jGtZMFAvjg",
    authDomain: "overlooking-admin.firebaseapp.com",
    databaseURL: "https://overlooking-admin.firebaseio.com",
    projectId: "overlooking-admin",
    storageBucket: "overlooking-admin.appspot.com",
    messagingSenderId: "660461854849",
    appId: "1:660461854849:web:e79d9aad5558b223"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({});

export default firebase;