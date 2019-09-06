import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import store from '../store';
import { authUISignUp } from '../store/actions/authActions'

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      const isNewUser = authResult.additionalUserInfo.isNewUser;

      if (isNewUser) {
        store.dispatch(authUISignUp(authResult));
      }

      store.dispatch({ type: 'FIREBASE_UI_SUCCESS', authResult });
      return true;
    },
    signInFailure: function (err) {
      store.dispatch({ type: 'FIREBASE_UI_ERROR', err });
    },
    uiShown: function () {
      store.dispatch({ type: 'FIREBASE_UI_SHOWN' });
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
  credentialHelper: firebaseui.auth.CredentialHelper.NONE
}

export default uiConfig;