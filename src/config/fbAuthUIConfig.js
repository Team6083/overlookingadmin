import firebase from 'firebase';
import firebaseui from 'firebaseui';
import store from '../store';
import { onSignUpSuccess } from '../store/actions/authActions'

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      const user = authResult.user;
      const isNewUser = authResult.additionalUserInfo.isNewUser;

      if (isNewUser) {
        const firestore = firebase.firetore(store.getState().firebase);
        onSignUpSuccess(firestore, user.uid, {});
      }

      store.dispatch({ type: 'FIREBASE_UI_SUCCESS', authResult });
      return false;
    },
    signInFailure: function (err) {
      store.dispatch({ type: 'FIREBASE_UI_ERROR', err });
    },
    uiShown: function () {

    }
  },
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: [
        // 'https://www.googleapis.com/auth/contacts.readonly'
      ]
    },
    firebase.auth.GithubAuthProvider.PROVIDER_ID
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
}

export default uiConfig;