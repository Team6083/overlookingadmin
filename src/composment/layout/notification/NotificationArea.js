import React, { Component } from 'react'
import Notification from './Notification'

import { connect } from 'react-redux'

export class NotificationArea extends Component {
    render() {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: 100,
                    right: 20,
                    zIndex: 1020
                }}
            >
                {this.props.notifications.map((notification, i) => {
                    return (
                        <Notification title={notification.title} message={notification.message} status={notification.status} key={i} />
                    )
                })}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    console.log(state.notification.notifications);
    return {
        notifications: state.notification.notifications
    }
}

export default connect(mapStateToProps)(NotificationArea)
