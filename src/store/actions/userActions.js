
/**
 * Save a user.
 * @param {User} user
 * @param {String} uid
 * @param {Boolean} [update]
 */
export const saveUser = (user, uid, update) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();

        delete user.isEmpty;
        delete user.isLoaded;

        return firestore.collection('users').doc(uid).set(user, { merge: (update === true) })
            .then(function (docRef) {
                dispatch({ type: "SAVE_USER_SUCCESS", uid, docRef });
                dispatch({ type: "NOTIFICATION_SEND", notification: { title: "Save Profile Success", message: "Your profile saved successful.", status: "success" } });
            })
            .catch(function (err) {
                dispatch({ type: "SAVE_USER_ERROR", err });
                dispatch({ type: "NOTIFICATION_SEND", notification: { title: "Save Profile Fail", message: "Error: " + err.message, status: "danger" } })
            });
    }
}