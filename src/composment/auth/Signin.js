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
                <div className="row">
                    <div className="col-12 col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h3>Sign In</h3>

                            <div className="text-danger text-center mt-md-2">
                                {authError ? <p className="mb-2 mt-2"><i class="material-icons">error_outline</i>{authError}</p> : null}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input className="form-control" type="email" id="email" onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input className="form-control" type="password" id="password" onChange={this.handleChange} />
                            </div>
                            <button className="btn btn-primary">Login</button>
                        </form>
                    </div>
                    <div className="col-12 col-md-6">
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
