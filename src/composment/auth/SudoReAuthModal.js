import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MDBModal } from 'mdbreact'
import SudoModeReAuth from './SudoModeReAuth'

export class SudoReAuthModal extends Component {

    state = {
        reAuthTime: null
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            reAuthTime: this.props.firebase.auth.lastLoginAt
        })
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if (oldProps.reAuthTime !== newProps.reAuthTime) {
            this.setState({
                ...this.state,
                reAuthTime: newProps.reAuthTime
            })
        }
    }

    reAuthValidLength = 30

    render() {
        return (
            <div className="container">
                <MDBModal isOpen={(((new Date()) - this.state.reAuthTime) > this.reAuthValidLength * 1000 * 60)} toggle={() => { }} size="lg" >
                    <div className="pt-md-5 pb-md-5" style={{ backgroundColor: "ghostwhite" }}>
                        <SudoModeReAuth />
                    </div>
                </MDBModal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        firebase: state.firebase,
        reAuthTime: state.auth.reAuthTime
    }
}

export default connect(mapStateToProps)(SudoReAuthModal)
