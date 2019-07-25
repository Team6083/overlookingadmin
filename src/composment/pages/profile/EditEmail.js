import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateEmail } from '../../../store/actions/authActions'
import SudoReAuthModal from '../../auth/SudoReAuthModal'

export class EditEmail extends Component {

    state = {
        newEmail: null
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateEmail(this.state.newEmail)
    }

    render() {
        let {reAuthTime} = this.props.auth;
        return (
            <div>
                <SudoReAuthModal />
                <form onSubmit={this.handleSubmit}>
                    <div className="text-center">
                        <h2>Update email</h2>
                        <div className="form-row mt-5">
                            <div className="col-lg-4"></div>
                            <div className="col-lg-4 col-12">
                                <div className="form-group">
                                    <label htmlFor="newEmail">New Email Address</label>
                                    <input type="email" id="newEmail" className="form-control" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Save</button>
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
