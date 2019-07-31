import React, { Component } from 'react'
import { MDBNotification } from 'mdbreact'

export class Notification extends Component {

    state = {
        postTime: new Date(),
        text: ""
    }

    componentDidMount = () => {
        this.updateTextTime();
        setInterval(() => {
            this.updateTextTime();
        }, 5000)
    }

    updateTextTime = () => {
        let text = "";
        let deltaTime = (new Date() - this.state.postTime) / 1000;

        if (deltaTime < 60) {
            text = "Just now";
        } else if (deltaTime < 60 * 60) {
            text = Math.floor(deltaTime / 60) + " min ago";
        } else {
            text = Math.floor(deltaTime / 60 / 60) + " hours ago";
        }

        this.setState({
            ...this.state,
            text: text
        })
    }

    render() {

        const getLabelColor = () => {
            switch (this.props.status) {
                case "success":
                    return "#64dd17";
                case "warning":
                    return "#FF8800";
                case "danger":
                    return "#CC0000";
                case "info":
                    return "#0099CC";
                case "promary":
                    return "#0d47a1";
                default:
                    return "#007aff";
            }
        }

        return (
            <MDBNotification
                show
                fade
                title={this.props.title}
                message={this.props.message}
                text={this.state.text}
                labelColor={getLabelColor()}
                style={{minWidth: 280}}
            />
        )
    }
}

export default Notification
