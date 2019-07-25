import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import uiConfig from '../../config/fbAuthUIConfig'
import { reAuth, reAuthWithCredential } from '../../store/actions/authActions'
import './firebaseui/firebaseui.css'
import firebaseProviders from './firebaseui/firebaseProviders'

export class SudoModeReAuth extends Component {
    state = {
        signInOpt: uiConfig.signInOptions,
        password: ''
    }

    handleReAuth = (provider) => {
        this.props.reAuth(provider);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            this.state.password
        );

        this.props.reAuthWithCred(credential);
    }

    render() {
        const { reAuthError } = this.props;
        return (
            <div className="container">
                <h3 className="text-center">Confirm your identity to continue</h3>
                <div className="text-center">
                    {reAuthError ?
                        <blockquote className="blockquote bq-danger">
                            <h6 className="bq-title"> <i className="material-icons">error_outline</i> Error</h6>
                            <p>{reAuthError}</p>
                        </blockquote>
                        : null}
                </div>
                <div className="row">
                    <div className="col-0 col-md-2"></div>
                    <div className="col-12 col-md-4">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input className="form-control" type="password" id="password" onChange={this.handleChange} />
                            </div>
                            <button className="btn btn-primary">Confirm password</button>
                        </form>
                    </div>
                    <div className="col-12 col-md-4">
                        <ul className="firebaseui-idp-list">
                            {this.state.signInOpt.map((providerId, i) => {

                                if ((typeof providerId) !== "string") {
                                    providerId = providerId.provider;
                                }

                                const providers = firebaseProviders;
                                let { icon, name, btnClass, provider } = providers[providerId];

                                return (
                                    <li className="firebaseui-list-item" key={i} id={providerId}>
                                        <button onClick={() => {
                                            this.handleReAuth(new provider());
                                        }} className={"firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-id-idp-button " + btnClass}>
                                            <span className="firebaseui-idp-icon-wrapper">
                                                <img className="firebaseui-idp-icon" alt=""
                                                    src={icon} />
                                            </span>
                                            <span className="firebaseui-idp-text firebaseui-idp-text-long">Sign in with {name}</span>
                                            <span className="firebaseui-idp-text firebaseui-idp-text-short"></span>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reAuth: (provider) => { dispatch(reAuth(provider)); },
        reAuthWithCred: (cred) => { dispatch(reAuthWithCredential(cred)); }
    }
}

const mapStateToProps = (state) => {
    return {
        reAuthError: state.auth.reAuthError,
        firebase: state.firebase
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SudoModeReAuth)