const admin = require('firebase-admin');

const getAppByID = async (ID) => {
    const res = await admin.firestore().collection('apps').doc(ID).get();
    return {
        ...res.data(),
        id: ID
    };
}

const getAllApps = async () => {
    const res = await admin.firestore().collection('apps').get();
    let data = [];
    res.forEach((doc) => {
        data.push({
            ...doc.data(),
            id: doc.id
        });
    });

    return data;
}

const addApp = async (app) => {
    const appDocRef = await admin.firestore().collection('apps').add(app);
    const doc = await appDocRef.get()
    return {
        ...doc.data(),
        id: doc.id
    }
}

const appResolver = {

}

module.exports = {
    getAppByID,
    getAllApps,
    addApp,
    appResolver
}