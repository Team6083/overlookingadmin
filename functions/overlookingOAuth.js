const functions = require('firebase-functions');

const getInvalidAppTokenError = () => {
    let error = new Error("app_token not valid");
    error.code = "overAuth/invalid_app_token";
    return error;
}

const getCustomToken = (req, res, admin) => {
    const data = req.body.data;
    admin.auth().verifyIdToken(data)
        .then(function (decodedToken) {
            var uid = decodedToken.uid;

            admin.auth().createCustomToken(uid)
                .then(function (customToken) {
                    res.status(200).send(customToken);
                })
                .catch(function (error) {
                    console.log("Error creating custom token:", error);
                    res.status(500).send(error);
                });
        }).catch(function (error) {
            console.error(error.code);
            res.status(500).send(error);
        });
}


const getUsersAppUID = (req, res, admin) => {
    const data = req.body.data;
    admin.auth().verifyIdToken(data.id_token)
        .then(function (decodedToken) {
            const uid = decodedToken.uid;
            console.log(decodedToken);

            admin.firestore().collection("apps").where("appName", "==", data.appName).get()
                .then((querySnapshot) => {
                    const appInfo = querySnapshot.docs[0].data();
                    console.log(appInfo);
                    if (appInfo.app_token === data.app_token) {
                        admin.firestore().collection("users").doc(uid).collection("appDatas").doc(appInfo.appName).get()
                            .then((snapshot) => {
                                const userAppData = snapshot.data();
                                res.status(200).send(userAppData.uid);
                            })
                            .catch((error) => {
                                console.error(error);
                                res.status(500).send(error);
                            });
                    } else {
                        res.status(500).send(getInvalidAppTokenError());
                    }
                }).catch((error) => {
                    console.error(error);
                    res.status(500).send(error);
                });
        }).catch(function (error) {
            console.error(error.code);
            res.status(500).send(error);
        });
}

module.exports = {
    getCustomToken,
    getUsersAppUID
}