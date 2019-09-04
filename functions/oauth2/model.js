const _ = require('lodash');
const firestore = require('firebase-admin').firestore();
// const db = require('./database');

// const User = db.User;
// const OAuthClient = db.OAuthClient;
// const OAuthAccessToken = db.OAuthAccessToken;
// const OAuthAuthorizationCode = db.OAuthAuthorizationCode;
// const OAuthRefreshToken = db.OAuthRefreshToken;

function getAccessToken(accessToken) {
    // populate 'user', 'client'
    console.log('getAccessToken', accessToken);
    return firestore.collection('OAuthAccessToken').where('accessToken', '==', accessToken).get()
        .then((docSnap) => {
            return docSnap.docs[0].data();
        })
        .then((dbToken) => {
            dbToken.accessTokenExpiresAt = dbToken.accessTokenExpiresAt.toDate();
            return dbToken;
        })
        .catch((err) => {
            console.log('getAccessToken - Err: ', err);
        });
}

function getClient(clientId, clientSecret) {
    console.log('getClient', clientId, clientSecret);

    return firestore.collection('OAuthClient').where('clientId', '==', clientId).get()
        .then((docSnap) => {
            return docSnap.docs[0] ? Object.assign(docSnap.docs[0].data(), { _id: docSnap.docs[0].id }) : null;
        })
        .then(client => (client ? Object.assign(client, { id: clientId }) : null))
        .catch((err) => {
            console.log('getClient - Err: ', err);
        });
}


function getUser(username, password) {
    // // TODO: Hashing of password

    return firestore.collection('OAuthUsers').where('username', '==', username).where('password', '==', password).get()
        .then((docSnap) => {
            return docSnap.docs[0].data();
        })
        .then(user => user)
        .catch((err) => {
            console.log('getUser - Err: ', err);
        });
}

function revokeAuthorizationCode(code) {
    console.log('revokeAuthorizationCode', code);
    return firestore.collection('OAuthAuthorizationCode').where('code', '==', code.code).get()
        .then((docSnap) => {

            return docSnap.docs[0] ? docSnap.docs[0].ref.delete() : null;
        })
        .then(() => {
            return true;
        })
        .catch((err) => {
            console.log('revokeAuthorizationCode - Err: ', err);
        });
}

function revokeToken(token) {
    console.log('revokeToken', token);
    return firestore.collection('OAuthRefreshToken').where('refreshToken', '==', token.refreshToken).get()
        .then((docSnap) => {
            return docSnap.docs[0].ref.delete();
        })
        .catch((err) => {
            console.log('revokeAuthorizationCode - Err: ', err);
        });
}


function saveToken(token, client, user) {
    console.log('saveToken', token, client, user);

    return Promise.all([
        firestore.collection('OAuthAccessToken').add({
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            client: client._id,
            user: user._id,
            scope: token.scope
        }),
        token.refreshToken ? firestore.collection('OAuthRefreshToken').add({ // no refresh token for client_credentials
            refreshToken: token.refreshToken,
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            client: client._id,
            user: user._id,
            scope: token.scope
        }) : Promise.resolve()
    ])
        .then(() => _.assign({ client, user }, token))
        .catch((err) => {
            console.log('revokeToken - Err: ', err);
        });
}

function getAuthorizationCode(code) {
    console.log('getAuthorizationCode', code);

    return firestore.collection('OAuthAuthorizationCode').where('code', '==', code).get()
        .then((docSnap) => {
            return docSnap.docs[0] ? docSnap.docs[0].data() : false;
        })
        .then((code) => {
            return new Promise((resolve, reject) => {
                firestore.collection('OAuthClient').doc(code.client).get()
                    .then((docSnap) => {
                        return docSnap.exists ? docSnap.data() : null;
                    })
                    .then((client) => {
                        code.client = client;
                        resolve(code);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        })
        .then((code) => {
            return new Promise((resolve, reject) => {
                console.log(code.user);
                firestore.collection('OAuthUsers').doc(code.user).get()
                    .then((docSnap) => {
                        return docSnap.exists ? Object.assign(docSnap.data(), { _id: docSnap.id }) : null;
                    })
                    .then((user) => {
                        code.user = user;
                        resolve(code);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        })
        .then((authCodeModel) => {
            // populate 'user', 'client'
            console.log(authCodeModel);
            authCodeModel.expiresAt = authCodeModel.expiresAt.toDate();
            const extendedClient = Object.assign(authCodeModel.client, { id: authCodeModel.client.clientId });
            return Object.assign(authCodeModel, { client: extendedClient });
        })
        .catch((err) => {
            console.log('getAuthorizationCode - Err: ', err);
        });
}

function saveAuthorizationCode(code, client, user) {
    console.log('saveAuthorizationCode', code, client, user);

    return firestore.collection('OAuthAuthorizationCode')
        .add({
            expiresAt: code.expiresAt,
            client: client._id,
            code: code.authorizationCode,
            user: user._id,
            scope: code.scope
        })
        .then(() => ({ // TODO: Consider changing expiresAt to expiresIn (seconds)
            authorizationCode: code.authorizationCode,
            authorization_code: code.authorizationCode,
            expires_in: Math.floor((code.expiresAt - new Date()) / 1000)
        }))
        .catch((err) => {
            console.log('saveAuthorizationCode - Err: ', err);
        });
}

function getUserFromClient(client) {
    console.log('getUserFromClient', client);

    return firestore.collection('OAuthUsers').doc(client.user)
        .then(dbUser => dbUser)
        .catch((err) => {
            console.log('getUserFromClient - Err: ', err);
        });
}

function getRefreshToken(refreshToken) {
    console.log('getRefreshToken', refreshToken);

    return firestore.collection('OAuthRefreshToken').where('refreshToken', '>', refreshToken).get()
        .then((docSnap) => {
            return docSnap.docs[0] ? docSnap.docs[0].data() : false;
        })
        .then((dbToken) => {
            const extendedClient = Object.assign(dbToken.client, { id: dbToken.client.clientId });
            return Object.assign(dbToken, { client: extendedClient });
        }).catch((err) => {
            console.log('getRefreshToken - Err: ', err);
        });
}

/**
In case there is a need to scopes for the user, uncomment the code.
It will also be required to provide scopes for both user and client
*/
// eslint-disable-next-line
function validateScope(user, client, scope) {
    return scope;
    //TODO: finish scope check
    // console.log('validateScope', user, client, scope);
    // return (user.scope === scope && client.scope === scope && scope !== null) ? scope : false;
}

/**
In case there is a need to scopes for the user, uncomment the code.
It will also be required to provide scopes for both user and client (They should also match)
*/
// eslint-disable-next-line
function verifyScope(token, scope) {
    console.log('verifyScope', token, scope);
    return token.scope === scope;
}

function getUserByID(id) {
    console.log('getUserByID', id);
    return firestore.collection('OAuthUsers').doc(id).get()
        .then((docSnap) => {
            docSnap.exists ? Object.assign(docSnap.data(), { _id: docSnap.id }) : false;
        })
        .catch((err) => {
            console.log('getUserFromClient - Err: ', err);
        });
}

module.exports = {
    // generateAccessToken(client, user, scope) optional
    // generateAuthorizationCode(), optional
    // generateRefreshToken(client, user, scope) - optional
    getAccessToken,
    getAuthorizationCode,
    getClient,
    getRefreshToken,
    getUser,
    getUserFromClient,
    revokeAuthorizationCode,
    revokeToken,
    saveToken,
    saveAuthorizationCode,
    validateScope,
    verifyScope,
    getUserByID
};
