const initState = {
    authError: null,
    updateEmailError: null,
    reAuthError: null,
    reAuthTime: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('login error', action.err);
            return {
                ...state,
                authError: action.err.message
            };
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
                ...state,
                authError: null
            };
        case 'SIGNOUT_SUCCESS':
            console.log('Signout success');
            return state
        case 'SIGNOUT_ERROR':
            console.log('Signout error', action.err);
            return state
        case 'SIGNUP_SUCCESS':
            console.log('Signup success');
            return {
                ...state,
                authError: null
            };
        case 'SIGNUP_ERROR':
            console.log('Signup error', action.err);
            return {
                ...state,
                authError: action.err.message
            };
        case 'FIREBASE_UI_SUCCESS':
            console.log('Firebase ui success', action.authResult);
            return {
                ...state,
                authError: null
            }
        case 'FIREBASE_UI_ERROR':
            console.log('Firebase ui error', action.err);
            return {
                ...state,
                authError: action.err.message
            };
        case 'FIREBASE_UI_SHOWN':
            console.log('Firebase ui shown');
            return state;
        case 'UPDATEEMAIL_SUCCESS':
            console.log('update email success');
            return {
                ...state,
                updateEmailError: null
            };
        case 'UPDATEEMAIL_ERROR':
            console.log('update email error', action.err);
            return {
                ...state,
                updateEmailError: action.err.message
            };
        case 'REAUTH_SUCCESS':
            console.log('reauth success');
            return {
                ...state,
                reAuthError: null,
                reAuthTime: new Date()
            };
        case 'REAUTH_ERROR':
            console.log('reauth error', action.err);
            return {
                ...state,
                reAuthError: action.err.message,
                reAuthTime: null
            };
        default:
            return state;
    }
}

export default authReducer