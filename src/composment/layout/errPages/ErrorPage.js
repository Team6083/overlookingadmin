import React, { Component } from 'react'
import { MDBBadge } from 'mdbreact'

export class ErrorPage extends Component {

    httpErrors = {
        401: {
            title: "401 Unauthorized",
            content: "You have to login to continue"
        },
        403: {
            title: "403 Forbidden",
            content: "You don't have the permission to check the page you are looking for"
        },
        404: {
            title: "404 NOT FOUND",
            content: "We can't fund the page you are looking for (;﹏;)"
        }
    }

    getErrorTitle(code) {
        if (this.httpErrors[code]) {
            return this.httpErrors[code].title;
        }

        return "HTTP ERROR: " + code;
    }

    getErrorContent(code) {
        if (this.httpErrors[code]) {
            return this.httpErrors[code].content;
        }

        return "";
    }

    render() {
        return (
            <div className="container">
                <div className="text-center mt-5">
                    <h1><MDBBadge pill color="danger">{this.getErrorTitle(this.props.errCode)}</MDBBadge></h1>
                    <br></br>
                    <h4>{this.getErrorContent(this.props.errCode)}</h4>
                </div>
            </div>
        )
    }
}

export default ErrorPage
