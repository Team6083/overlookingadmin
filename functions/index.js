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

exports.createUser = functions.https.onCall((data, context) => {
  if (!context.auth) {
    return appFuncErr("unauthorized");
  }

  const uid = context.auth.uid;

  return admin.auth().getUser(uid)
    .then((user) => {
      //TODO: Update permisson check
      if (!user.customClaims || !user.customClaims.admin) {
        return appFuncErr("no-permission");
      }

      return admin.auth().createUser({
        email: data.email,
        password: data.password
      });
    })
    .then((userRecord) => {
      return userRecord;
    });
});

function appFuncErr(message) {
  return {
    ok: false,
    err: message
  }
}

function appFuncOk(body) {
  return {
    ok: true,
    body
  }
}

exports.removeUserFromDatabase = functions.auth.user().onDelete((user) => {
  // Get the uid of the deleted user.
  var uid = user.uid;

  // Remove the user from your Realtime Database's /users node.
  return admin.firestore().collection("users").doc(uid).delete();
});

const oAuthAPI = require('./oauth2/index')

exports.oAuth = functions.https.onRequest(oAuthAPI);