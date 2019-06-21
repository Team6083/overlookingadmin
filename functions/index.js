const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const cors = require('cors')({
  origin: true,
});

const overAuth = require("./overlookingOAuth");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.slackWebhook = functions.https.onRequest((req, res) => {
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  var data = req.body;

  return admin.database().ref('/webhooks').push({
    data: data
  });
});

exports.addUserToDataBase = functions.auth.user().onCreate((user) => {
  var userData = {};

  userData["name"] = "unknown";
  userData["level"] = 1;
  userData["email"] = user.email;
  userData["providerUID"] = user.providerData[0].uid;
  userData["providerId"] = user.providerData[0].providerId;
  return admin.firestore().collection("users").doc(user.uid).set(userData, { merge: true });
});

exports.removeUserFromDatabase = functions.auth.user().onDelete((user) => {
  // Get the uid of the deleted user.
  var uid = user.uid;

  // Remove the user from your Realtime Database's /users node.
  return admin.firestore().collection("users").doc(uid).delete();
});

exports.verifyIDToken = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    const type = req.body.type;
    switch (type) {
      case "getCustomToken":
        overAuth.getCustomToken(req, res, admin);
        break;
      case "getUsersAppUID":
        overAuth.getUsersAppUID(req, res, admin);
        break;
    }
  });
});