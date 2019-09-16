import React, { Component } from 'react'
import CreateUserForm from './createUserForm'

export class createUser extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>Create User</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <CreateUserForm mode="createUser" />
                    </div>
                </div>
            </div>
        )
    }
}

export default createUser
