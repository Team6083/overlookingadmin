export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' })
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

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName
            }, { merge: true }).then(() => {
                dispatch({ type: 'SIGNUP_SUCCESS' });
            }).catch((err) => dispatch({ type: 'SIGNUP_ERROR', err }));
        })
    }
}

export const linkGoogle = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().currentUser.linkWithPopup(provider).then(function () {
            dispatch({type: 'LINK_SUCCESS', provider});
        }).catch(function (err) {
            dispatch({type: 'LINK_ERROR', provider, err});
        });
    };
}

