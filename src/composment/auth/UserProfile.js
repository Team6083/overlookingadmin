import React, { Component } from 'react'
import { linkGoogle } from '../../store/actions/authActions'
import { connect } from 'react-redux'

export class UserProfile extends Component {

    handleLinkGoogleAccount = () => {

    }

    render() {
        return (
            <div className="container">
                <div className="section">
                    <div class="row">
                        <div class="col s12">
                            <ul className="tabs">
                                <li className="tab"><a href="#general">General</a></li>
                                <li className="tab"><a href="#account">Account</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="section">

                    {/* <div className="row">
                        <div className="col s12 m6">

                        </div>
                        <div className="col s12 m6">

                        </div>
                    </div> */}
                </div>
            </div>
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
