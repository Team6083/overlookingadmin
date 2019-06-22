import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { signIn } from '../../store/actions/authActions'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import uiConfig from '../../config/fbAuthUIConfig';

class Signin extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    handleGoogleLogin = () => {
        this.props.googleSignIn();
    }

    render() {
        const { authError, firebaseInstance } = this.props;
        return (
            <div className="container">
                <div className="row white">
                    <div className="col s12 m6">
                        <form onSubmit={this.handleSubmit}>
                            <h5 className="grey-text text-darken-3">Sign In</h5>
                            <div className="input-field">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <button className="btn pink lighten-1 z-depth-0">Login</button>
                                <div className="red-text center">
                                    {authError ? <p><i class="material-icons">error_outline</i>{authError}</p> : null}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col s12 m6">
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth(firebaseInstance)} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        firebase: state.firebase
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
