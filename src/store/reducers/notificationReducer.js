const initState = {
    notifications: []
}

const notificationReducer = (state = initState, action) => {
    switch (action.type) {
        case "NOTIFICATION_SEND":
            console.log("Notification", action.notification);
            return {
                ...state,
                notifications:[
                    ...state.notifications,
                    action.notification
                ]
            };
        default:
            return state;
    }
}

export default notificationReducer