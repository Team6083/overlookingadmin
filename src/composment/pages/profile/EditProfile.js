import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditUserProfile from '../user/editUserProfile';

export class EditProfile extends Component {

    render() {
        return (
            <div>
                <h4>Your Profile</h4>
                <EditUserProfile targetUID={this.props.firebase.auth.uid} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        firebase: state.firebase
    }
}

export default connect(mapStateToProps)(EditProfile)
