import React from 'react'
import { Link } from 'react-router-dom'
import Links from './Links'

const NavBar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to='/' className='navbar-brand'>Overlooking Admin</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMain">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Links links={props.links} />
        </nav>
    )
}

export default NavBar;