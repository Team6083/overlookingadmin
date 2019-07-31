import React, { Component } from 'react'
import EditUserProfile from './editUserProfile'

export class editUser extends Component {
    render() {
        let search = this.props.location.search;
        search = search.split('?')[1];
        let uid = search.split('=')[1];
        return (
            <div>
                <EditUserProfile targetUID={uid} />
            </div>
        )
    }
}

export default editUser
