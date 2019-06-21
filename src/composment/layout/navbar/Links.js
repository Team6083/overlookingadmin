import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../../store/actions/authActions'
import roles from '../../../constant/userRoles'
import permissionCheck from '../../auth/permissionCheck';

const Links = (props) => {
    const { links, auth, profile } = props
    const userLogined = auth.uid ? true : false

    const linkList = links.map((route, i) => {
        const { path, name, permission } = route;
        const renderLink = () => {
            return (
                <li key={i}>
                    <NavLink to={path}>{name}</NavLink>
                </li>
            )
        }

        let role = roles.UnAuth;
        if (userLogined) {
            role = roles.Student;
        }

        if (permission) {
            return permissionCheck(permission, role) ? renderLink() : null;
        } else {
            return renderLink();
        }
    })

    const getInitals = () => {
        let initals = "";
        if (profile.firstName) {
            initals += profile.firstName[0];
        }
        if (profile.lastName) {
            initals += profile.lastName[0];
        }
        return initals;
    }

    return (
        <ul className="right">
            {linkList}
            {userLogined ? <li><a onClick={props.signOut}>Sign Out</a></li> : null}
            {userLogined ? <li>
                <NavLink to='/' className="btn btn-floating pink lighten-1">
                    {getInitals()}
                </NavLink>
            </li> : null}
        </ul>
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