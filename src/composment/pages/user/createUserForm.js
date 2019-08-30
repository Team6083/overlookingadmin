import React, { Component } from 'react'

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
        this.props.signUp(this.state);
    }

    render() {
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
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type="password" id="password" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
            </form>
        )
    }
}

export default createUserForm
