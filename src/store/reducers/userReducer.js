/**
 * @typedef {Object} User
 * @property {String} name
 * @property {String} username
 * @property {String} email
 * @property {number} accountStatus
 * @property {String} displayName
 * @property {Date} birthDay
 * @property {SchoolData} schoolData
 * @property {UserPhoneNumbers} phoneNumbers
 * @property {String} address
 * @property {firebase.firestore.DocumentReference} parentData
 */

/**
 * @typedef {Object} SchoolData
 * @property {String} type
 * @property {String} [school]
 * @property {String} department
 * @property {Number} [number]
 * @property {String} [id]
 */

/**
 * @typedef {Object} UserPhoneNumbers
 * @property {String} home
 * @property {String} mobile
 */


const initState = {}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case "SAVE_USER_SUCCESS":
            console.log("User " + action.uid + " saved");
            return {
                ...state,
                saveUserSuccess: true
            };
        case "SAVE_USER_ERROR":
            console.log("Fail to save user", action.err);
            return {
                ...state,
                saveUserSuccess: false
            };
        case "LASTLOGINTIME_UPDATED":
            console.log("Last login time of " + action.uid + " updated");
            return state;
        default:
            return state;
    }
}

export default userReducer