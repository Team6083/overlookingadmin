import React from 'react'
import { NavLink } from 'react-router-dom'

const Links = (props) => {
    const { links } = props
    const userLogined = true

    const linkList = links.map((route, i) => {
        const { path, name } = route;
        console.log(route);
        const renderLink = () => {
            return (
                <li key={i}>
                    <NavLink to={path}>{name}</NavLink>
                </li>
            )
        }

        return renderLink();
    })

    return (
        <ul className="right">
            {linkList}
            {userLogined ? <li><a >Sign Out</a></li> : null}
            {userLogined ? <li><NavLink to='/' className="btn btn-floating pink lighten-1">KH</NavLink></li> : null}
        </ul>
    )
}

export default Links;