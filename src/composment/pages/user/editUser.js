import React, { Component } from 'react'
import EditUserProfile from './editUserProfile'

export class editUser extends Component {

    constructor(props) {
        super(props);

        this.enableEditBtnClick.bind(this);
    }

    state = {
        enableEdit: false
    }

    enableEditBtnClick = (e) => {
        this.setState({
            ...this.state,
            enableEdit: true
        })
    }

    render() {
        let search = this.props.location.search;
        search = search.split('?')[1];
        let uid = search.split('=')[1];
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-1"></div>
                    <div className="col-12 col-lg-10">
                        <h4>Edit Profile</h4>
                        <button className={"btn btn-block btn-warning mt-3 " + (!this.state.enableEdit ? null : "d-none")} onClick={this.enableEditBtnClick}>Click to enable edit</button>
                        <div className="mt-3">
                            <EditUserProfile targetUID={uid} disabled={!this.state.enableEdit} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default editUser
