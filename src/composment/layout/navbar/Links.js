import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../../store/actions/authActions'
import { roles } from '../../../constant/userRoles'
import permissionCheck from '../../auth/permissionCheck';

import { MDBCollapse, MDBNavbarNav, MDBNavItem, MDBNavLink } from 'mdbreact'

const Links = (props) => {
    const { links, auth, profile } = props
    const userLogined = auth.uid ? true : false

    const linkList = links.map((route, i) => {
        const { path, name, permission, hideOnNav } = route;
        const renderLink = () => {
            return (
                <MDBNavItem key={i}>
                    <MDBNavLink className="nav-link" to={path}>{name}</MDBNavLink>
                </MDBNavItem>
            )
        }

        let role = roles.UnAuth;
        if (userLogined) {
            role = roles.Student;
        }

        if (hideOnNav === true) return null;

        if (permission) {
            return permissionCheck(permission, role) ? renderLink() : null;
        } else {
            return renderLink();
        }
    })

    const getName = () => {
        if (profile.name !== "" && profile.name !== null && profile.name !== undefined) return profile.name;
        else return auth.uid;
    }

    return (
        <MDBCollapse isOpen={props.open} navbar>
            <MDBNavbarNav left>
                {linkList}
            </MDBNavbarNav>

            <MDBNavbarNav right>
                {
                    userLogined ?

                        <div id="userBar">
                            <span className="navbar-text text-dark mr-md-2" id="navUser">
                                <NavLink to="/profile">
                                    <span className="badge badge-pill badge-primary" style={{ fontSize: '90%' }}>
                                        {getName()}
                                    </span>
                                </NavLink>
                            </span>
                        </div>
                        :
                        null
                }
                {
                    userLogined ?
                        <button className="btn btn-outline-dark" onClick={props.signOut}>Sign out</button>
                        : null
                }
            </MDBNavbarNav>
        </MDBCollapse>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Links);