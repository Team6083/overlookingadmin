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

export const linkGoogle = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().currentUser.linkWithPopup(provider).then(function () {
            dispatch({ type: 'LINK_SUCCESS', provider });
        }).catch(function (err) {
            dispatch({ type: 'LINK_ERROR', provider, err });
        });
    };
}

