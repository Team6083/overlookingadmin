import React from 'react'
import CreateUserForm from '../pages/user/createUserForm'

export default function Signup() {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>Sign Up</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <CreateUserForm mode="signUp" />
                    </div>
                </div>
            </div>
        </div>
    )
}
