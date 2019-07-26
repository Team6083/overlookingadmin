import React, { Component } from 'react'
import { linkGoogle } from '../../../store/actions/authActions'
import { connect } from 'react-redux'
import { MDBNav, MDBNavItem, MDBNavLink } from 'mdbreact';
import SubRouter from '../../SubRouter'
import EditProfile from './EditProfile'
import EditEmail from './EditEmail'
import EditPassword from './EditPassword'

export class UserProfile extends Component {
    state = {

    }


    handleLinkGoogleAccount = () => {

    }

    routes = [
        {
            path: '/editProfile',
            component: EditProfile,
            name: 'EditProfile'
        },
        {
            path: '/editEmail',
            component: EditEmail,
            name: 'EditEmail',
            hide: true
        },
        {
            path: '/editPassword',
            component: EditPassword,
            name: 'EditPassword'
        }
    ]

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2 col-12">
                        <div className="card">
                            <div className="card-body">
                                <MDBNav className="flex-column nav-pills">
                                    {this.routes.map((route, i) => {
                                        const { path, name, hide } = route;
                                        return !hide ?
                                            (<MDBNavItem
                                                key={i}>
                                                <MDBNavLink {...window.location.href === "/profile" + path ? "active" : null} to={"/profile" + path}>{name}</MDBNavLink>
                                            </MDBNavItem>) : null;
                                    })}
                                </MDBNav>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-10 col-12 mt-3 mt-lg-0" style={{ overflowY: "scroll" }}>
                        <SubRouter routes={this.routes} perfix="/profile" />
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        linkGoogleAcc: () => dispatch(linkGoogle)
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        firebase: state.firebase
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
