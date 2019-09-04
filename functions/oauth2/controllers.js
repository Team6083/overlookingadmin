const crypto = require('crypto');
const firestore = require('firebase-admin').firestore();

// const OAuthClient = db.OAuthClient;

module.exports.createClient = (req, res) => {
    console.log(JSON.stringify(req.body));

    firestore.collection('OAuthClient').add({
        clientId: crypto.createHash('md5').update(crypto.randomBytes(16)).digest('hex'),
        clientSecret: crypto.createHash('sha256').update(crypto.randomBytes(32)).digest('hex'),
        scope: 'profile'
    })
        .then((docRef) => {
            res.status(200);
            res.send();
        })
        .catch((err) => {
            console.log('Congraderror:', err);
        })
};

// module.exports.getClient = (req, res) => {
//     OAuthClient.findOne({ name: req.query.name })
//         .then((client) => {
//             res.json(client);
//         });
// };