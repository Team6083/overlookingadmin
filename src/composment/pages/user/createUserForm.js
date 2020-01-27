import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createUser } from '../../../store/actions/authActions'

export class createUserForm extends Component {

    state = {
        email: '',
        password: '',
        username: '',
        displayName: '',
        name: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        console.log(this.props.mode);
        this.props.createUser(this.state);
    }

    render() {
        const { mode } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input className="form-control" type="text" id="username" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="displayName">DisplayName</label>
                    <input className="form-control" type="text" id="displayName" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" onChange={this.handleChange} />
                    <small className="form-text text-muted">Please use your realname (Chinese) for this field.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="email" id="email" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <div className={mode === "signUp" ? "" : "d-none"}>
                        <label htmlFor="password">Password</label>
                        <input className="form-control" type={mode === "signUp" ? "password" : "hidden"} id="password" onChange={this.handleChange} autoComplete="new-password" />
                    </div>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (newUser) => dispatch(createUser(newUser))
    }
}

export default connect(null, mapDispatchToProps)(createUserForm)
