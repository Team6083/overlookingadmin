import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updatePassword } from '../../../store/actions/authActions'
import SudoReAuthModal from '../../auth/SudoReAuthModal'

export class EditPassword extends Component {

    state = {
        psw: {
            newPswConfirm: "",
            newPsw: ""
        },
        displayForm: true,
        actionError: null,
        success: false
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            psw: {
                newPswConfirm: "",
                newPsw: ""
            },
            success: false
        })
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            psw: {
                ...this.state.psw,
                [e.target.id]: e.target.value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.psw.newPsw !== this.state.psw.newPswConfirm) {
            this.state.actionError = "Password not match, please confirm the passwords you enter match."
        }

        this.props.updatePassword(this.state.psw.newPsw);

        this.setState({
            ...this.state,
            psw: {
                newPswConfirm: "",
                newPsw: ""
            },
            displayForm: false
        });
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if (oldProps.auth.actionError !== newProps.auth.actionError) {
            this.setState({
                ...this.state,
                actionError: newProps.auth.actionError,
                displayForm: newProps.auth.actionError !== null
            })
        }

        if (oldProps.auth.updatePasswordSuccess !== newProps.auth.updatePasswordSuccess) {
            this.setState({
                ...this.state,
                success: newProps.auth.updatePasswordSuccess
            })
        }
    }

    render() {
        let { actionError, success } = this.state;
        return (
            <div>
                <SudoReAuthModal />
                <form onSubmit={this.handleSubmit}>
                    <div className="text-center">
                        <h2>Update email</h2>
                        <div className="form-row mt-5">
                            <div className="col-lg-4"></div>
                            <div className="col-lg-4 col-12">
                                <div className="text-center">
                                    {actionError ?
                                        <blockquote className="blockquote bq-danger">
                                            <h6 className="bq-title"> <i className="material-icons">error_outline</i> Error</h6>
                                            <p>{actionError}</p>
                                        </blockquote>
                                        : null}
                                </div>
                                <div className={this.state.displayForm ? null : "d-none"}>
                                    <div className="form-group">
                                        <label htmlFor="newPsw">New Password</label>
                                        <input required type="password" id="newPsw" className="form-control" onChange={this.handleChange} value={this.state.psw.newPsw} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="newPswConfirm">Confirm New Password</label>
                                        <input required type="password" id="newPswConfirm" className="form-control" onChange={this.handleChange} value={this.state.psw.newPswConfirm} />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary btn-block">Save</button>
                                    </div>
                                </div>
                                <div className={success ? "alert alert-success" : "d-none"}>
                                    <h3 className="">Password updated</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePassword: (newPsw) => dispatch(updatePassword(newPsw))
    }
}

const mapStateToProps = (state) => {
    return {
        firebase: state.firebase,
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPassword)
