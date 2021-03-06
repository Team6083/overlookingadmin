import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateEmail } from '../../../store/actions/authActions'
import SudoReAuthModal from '../../auth/SudoReAuthModal'

export class EditEmail extends Component {

    state = {
        newEmail: null,
        displayForm: true,
        actionError: null
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            displayForm: false
        })
        this.props.updateEmail(this.state.newEmail)
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

        if (oldProps.auth.updateEmailSuccess !== newProps.auth.updateEmailSuccess) {
            if (newProps.auth.updateEmailSuccess) {
                document.location.pathname = '/profile/editProfile'
            }
        }
    }

    render() {
        let { actionError } = this.state;
        let { updateEmailSuccess } = this.props.auth;
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
                                        <label htmlFor="newEmail">New Email Address</label>
                                        <input required type="email" id="newEmail" className="form-control" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary btn-block">Save</button>
                                    </div>
                                </div>
                                <div className={!this.state.displayForm && !updateEmailSuccess ? null : "d-none"}>
                                    <div className="spinner-border text-info" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                                <div className={updateEmailSuccess ? "alert alert-success" : "d-none"}>
                                    <h3 className="">Email updated</h3>
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
        updateEmail: (newEmail) => dispatch(updateEmail(newEmail))
    }
}

const mapStateToProps = (state) => {
    return {
        firebase: state.firebase,
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEmail)
