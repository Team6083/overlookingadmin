import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Links from './Links'

import { MDBNavbar, MDBNavbarBrand, MDBNavbarToggler } from 'mdbreact'

export class NavBar extends Component {

    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <MDBNavbar color="white" className="fixed-top" light expand="lg">
                <MDBNavbarBrand>
                    <Link to='/' className="text-dark"><strong>Overlooking Admin</strong></Link>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <Links links={this.props.links} open={this.state.isOpen} />
            </MDBNavbar>
        )
    }
}

export default NavBar