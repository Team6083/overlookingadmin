const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.addUserToDataBase = functions.auth.user().onCreate((user) => {
  let userData = {
    name: "unknown",
    level: 1,
    email: user.email
  }

  return admin.firestore().collection("users").doc(user.uid).set(userData, { merge: true });
});

exports.removeUserFromDatabase = functions.auth.user().onDelete((user) => {
  // Get the uid of the deleted user.
  var uid = user.uid;

  // Remove the user from your Realtime Database's /users node.
  return admin.firestore().collection("users").doc(uid).delete();
});

const oAuthAPI = require('./oauth2/index')

exports.oAuth = functions.https.onRequest(oAuthAPI);