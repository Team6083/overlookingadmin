import React from 'react'
import { Link } from 'react-router-dom'
import Links from './Links'

const NavBar = (props) => {
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className='brand-logo'>Overlooking Admin</Link>
                <Links links={props.links} />
            </div>
        </nav>
    )
}

export default NavBar;