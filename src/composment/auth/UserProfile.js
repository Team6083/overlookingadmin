import React, { Component } from 'react'
import { linkGoogle } from '../../store/actions/authActions'
import { connect } from 'react-redux'

export class UserProfile extends Component {

    handleLinkGoogleAccount = () => {

    }

    render() {
        return (
            <div></div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        linkGoogleAcc: () => dispatch(linkGoogle)
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        firebase: state.firebase
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
