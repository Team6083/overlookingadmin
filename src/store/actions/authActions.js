import { saveUser } from './userActions';

export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((resp) => {
            dispatch({ type: 'LOGIN_SUCCESS' });
        }).catch((err) => dispatch({ type: 'LOGIN_ERROR', err }))
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut()
            .then(() => {
                dispatch({ type: 'SIGNOUT_SUCCESS' })
            })
            .catch((err) => dispatch({ type: 'SIGNOUT_ERROR', err }))
    }
}

export const saveNewUser = (uid, newUser) => {
    return dispatch => {
        const user = {
            username: newUser.username,
            displayName: newUser.displayName,
            name: newUser.name
        };

        dispatch(saveUser(user, uid, true));
    }
}

export const createUser = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();

        const createUser = firebase.functions().httpsCallable("createUser");
        createUser(newUser).then((result) => {
            console.log(result.data);
            if (!result.data.ok) {
                dispatch({ type: 'CREATE_USER_ERROR', err: new Error(result.data.err) });
                return;
            }
            dispatch(saveNewUser(result.data.user.uid, newUser));
            dispatch({ type: 'CREATE_USER_SUCCESS' });
        }).catch((err) => dispatch({ type: 'CREATE_USER_ERROR', err }));
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            dispatch(saveNewUser(resp.user.uid, newUser));
            dispatch({ type: 'SIGNUP_SUCCESS' });
        }).catch((err) => dispatch({ type: 'SIGNUP_ERROR', err }));
    }
}

export const authUISignUp = (resp) => {
    return (dispatch, getState, { getFirebase }) => {

    }
}

export const updateEmail = (newEmail) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().currentUser.updateEmail(newEmail).then(function () {
            if (!firebase.auth().currentUser.emailVerified) {
                firebase.auth().currentUser.sendEmailVerification().then(function () {
                    dispatch({ type: 'UPDATEEMAIL_SUCCESS' });
                }).catch(function (err) {
                    dispatch({ type: 'UPDATEEMAIL_ERROR', err });
                });
            }
            else {
                dispatch({ type: 'UPDATEEMAIL_SUCCESS' });
            }
        }).catch(function (err) {
            dispatch({ type: 'UPDATEEMAIL_ERROR', err });
        });
    }
}

export const updatePassword = (newPassword) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().currentUser.updatePassword(newPassword).then(function () {
            dispatch({ type: 'UPDATEPASSWORD_SUCCESS' });
        }).catch(function (err) {
            dispatch({ type: 'UPDATEPASSWORD_ERROR', err });
        })
    }
}

export const reAuth = (provider) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().currentUser.reauthenticateWithPopup(provider).then(function () {
            dispatch({ type: 'REAUTH_SUCCESS' });
        }, function (err) {
            dispatch({ type: 'REAUTH_ERROR', err });
        });
    }
}

export const reAuthWithCredential = (credential) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().currentUser.reauthenticateWithCredential(credential).then(function () {
            dispatch({ type: 'REAUTH_SUCCESS' });
        }, function (err) {
            dispatch({ type: 'REAUTH_ERROR', err });
        });
    }
}

export const linkAccount = (provider) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().currentUser.linkWithPopup(provider).then(function () {
            dispatch({ type: 'LINK_SUCCESS', provider });
        }).catch(function (err) {
            dispatch({ type: 'LINK_ERROR', provider, err });
        });
    };
}

export const unLinkAccount = (provider) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().currentUser.unlink(provider.providerId).then(function () {
            dispatch({ type: 'UNLINK_SUCCESS', provider });
        }).catch(function (err) {
            dispatch({ type: 'UNLINK_ERROR', provider, err });
        });
    };
}
