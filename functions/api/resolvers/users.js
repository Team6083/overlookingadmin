const admin = require('firebase-admin');

const getUserByUID = async (UID) => {
    const res = await admin.firestore().collection('users').doc(UID).get();
    return {
        ...res.data(),
        UID: UID
    };
}

const userResolver = {
    
}

module.exports = {
    getUserByUID,
    userResolver
}