import React, { Component } from 'react'
import { linkGoogle } from '../../../store/actions/authActions'
import { connect } from 'react-redux'
import { MDBInput, MDBBtn } from 'mdbreact';

export class EditProfile extends Component {
    state = {
        email: '',
        password: '',
        username: '',
        displayName: '',
        name: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    123
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

const mapStateToProps = (state) => {
    return {
        firebase: state.firebase
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
