import React, { Component } from 'react'
import { connect } from 'react-redux'
import { linkAccount, unLinkAccount } from '../../../store/actions/authActions'
import uiConfig from '../../../config/fbAuthUIConfig'
import '../../auth/firebaseui/firebaseui.css'
import firebaseProviders from '../../auth/firebaseui/firebaseProviders'
import { MDBCollapse } from 'mdbreact'

export class LinkAccount extends Component {

    state = {
        signInOpt: uiConfig.signInOptions,
        actionError: null,
        linkSuccess: false,
        unLinkSuccess: false,
        collapseID: ""
    }

    handleLink(provider) {
        console.log(provider);
        this.props.linkAcc(provider);
    }

    handleUnlink(provider) {
        console.log(provider);
        this.props.unLinkAcc(provider);
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props;

        let newState = this.state;

        if (oldProps.auth.actionError !== newProps.auth.actionError) {
            newState = {
                ...newState,
                actionError: newProps.auth.actionError,
                displayForm: newProps.auth.actionError !== null
            }
        }

        if (oldProps.auth.unLinkAccountSuccess !== newProps.auth.unLinkAccountSuccess) {
            newState = {
                ...newState,
                unLinkSuccess: newProps.auth.unLinkAccountSuccess
            }

            setTimeout(() => window.location.reload(), 1000);
        }

        if (oldProps.auth.linkAccountSuccess !== newProps.auth.linkAccountSuccess) {
            newState = {
                ...newState,
                linkSuccess: newProps.auth.linkAccountSuccess
            }

            setTimeout(() => window.location.reload(), 1000);
        }

        if (newState !== this.state) {
            this.setState(newState);
        }
    }

    toggleCollapse(collapseID) {
        this.setState({
            ...this.state,
            collapseID: this.state.collapseID !== collapseID ? collapseID : ""
        });
    }

    render() {
        let { actionError, linkSuccess, unLinkSuccess } = this.state;

        let { providerData } = this.props;
        let accountProviders = {};

        providerData.forEach((val) => {
            accountProviders = {
                ...accountProviders,
                [val.providerId]: {
                    ...val
                }
            }
        });

        return (
            <div>
                <h3>Link other accounts</h3>
                <div className="text-center">
                    {actionError ?
                        <blockquote className="blockquote bq-danger">
                            <h6 className="bq-title"> <i className="material-icons">error_outline</i> Error</h6>
                            <p>{actionError}</p>
                        </blockquote>
                        : null}
                </div>
                <ul className="firebaseui-idp-list">
                    {this.state.signInOpt.map((providerId, i) => {

                        if ((typeof providerId) !== "string") {
                            providerId = providerId.provider;
                        }

                        const providers = firebaseProviders;
                        let { icon, name, btnClass, provider } = providers[providerId];

                        return (
                            <li className="firebaseui-list-item" key={i} id={providerId}>
                                <button disabled={accountProviders[providerId] ? "disabled" : null} onClick={() => {
                                    this.handleLink(new provider());
                                }} className={"firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-id-idp-button " + btnClass}>
                                    <span className="firebaseui-idp-icon-wrapper">
                                        <img className="firebaseui-idp-icon" alt=""
                                            src={icon} />
                                    </span>
                                    <span className="firebaseui-idp-text firebaseui-idp-text-long">Link with {name}</span>
                                    <span className="firebaseui-idp-text firebaseui-idp-text-short">{name}</span>
                                </button>
                                {
                                    accountProviders[providerId] ?
                                        <div>
                                            <a href="./" className="badge badge-primary badge-pill" onClick={() => {
                                                this.toggleCollapse(providerId);
                                            }}>
                                                Linked with {accountProviders[providerId].displayName}
                                            </a>

                                            <button className="ml-2 btn btn-sm btn-danger" onClick={() => { this.handleUnlink(new provider()) }}>Unlink</button>

                                            <MDBCollapse id={providerId} isOpen={this.state.collapseID}>
                                                <img alt={accountProviders[providerId].displayName} src={accountProviders[providerId].photoURL} style={{
                                                    border: "none",
                                                    display: "inline-block",
                                                    height: "72px",
                                                    verticalAlign: "middle",
                                                    width: "72px",
                                                }}
                                                    className="rounded mr-2"
                                                />
                                                <h5>{accountProviders[providerId].displayName} ({accountProviders[providerId].uid})</h5>
                                                <h6><span className="badge badge-info">{accountProviders[providerId].email}</span></h6>
                                            </MDBCollapse>
                                        </div>
                                        : null
                                }
                            </li>
                        )
                    })}
                </ul>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col col-md-4 text-center">
                        <div className={linkSuccess ? "alert alert-success" : "d-none"}>
                            <h3>Account linked</h3>
                        </div>
                        <div className={unLinkSuccess ? "alert alert-success" : "d-none"}>
                            <h3>Account unlinked</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        linkAcc: (provider) => dispatch(linkAccount(provider)),
        unLinkAcc: (provider) => dispatch(unLinkAccount(provider))
    }
}

const mapStateToProps = (state) => {
    console.log(state.firebase.auth.providerData);
    return {
        firebase: state.firebase,
        auth: state.auth,
        providerData: state.firebase.auth.providerData
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkAccount)
