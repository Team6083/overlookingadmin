import React, { Component } from 'react'
import EditUserProfile from './editUserProfile'

export class editUser extends Component {
    render() {
        let search = this.props.location.search;
        search = search.split('?')[1];
        let uid = search.split('=')[1];
        return (
            <div className="container">
                <div className="col-lg-1"></div>
                <div className="col-12 col-lg-10">
                    <h4>Edit Profile</h4>
                    <EditUserProfile targetUID={uid} />
                </div>
            </div>
        )
    }
}

export default editUser
