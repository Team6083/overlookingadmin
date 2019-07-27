import React, { Component } from 'react'
import { connect } from 'react-redux'

export class EditParentData extends Component {

    relationOpt = [

    ]

    state = {
        parentData: {
            name: "",
            relationship: "",
            email: "",
            phoneNumber: ""
        },
        displayForm: true,
        actionError: null,
        success: false
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            parentData: {
                ...this.state.parentData,
                ...this.props.parentData
            },
            success: false
        })
    }

    componentWillReceiveProps(newProps) {
        if (newProps.parentData !== this.props.parentData) {
            this.setState({
                parentData: {
                    ...this.state.parentData,
                    ...newProps.parentData
                }
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            parentData: {
                ...this.state.parentData,
                [e.target.id]: e.target.value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let useOther = this.state.relationship.choose === "other";

        this.setState({
            ...this.state,
            parentData: {
                ...this.state.parentData,
                relationship: useOther ? this.state.relationship.other : this.state.relationship.choose
            },
            displayForm: false
        });
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props

        let newState = this.state;

        if (oldProps.auth.actionError !== newProps.auth.actionError) {
            newState = {
                ...newState,
                actionError: newProps.auth.actionError,
                displayForm: newProps.auth.actionError !== null
            }
        }

        if (oldProps.auth.updateParentDataSuccess !== newProps.auth.updateParentDataSuccess) {
            newState = {
                ...newState,
                success: newProps.auth.updateParentDataSuccess
            }
        }

        // setState
        if (newState !== this.state) {
            this.setState(newState);
        }
    }

    render() {
        let { actionError, success, parentData } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Update Parent data</h2>
                    <div className="text-center">
                        {actionError ?
                            <blockquote className="blockquote bq-danger">
                                <h6 className="bq-title"> <i className="material-icons">error_outline</i> Error</h6>
                                <p>{actionError}</p>
                            </blockquote>
                            : null}
                    </div>
                    <div className="row">
                        <div className="col-lg-1"></div>
                        <div className="col-12 col-lg-7">
                            {/* row 0: name, email, phoneNumber */}
                            <div className="form-row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input required type="text" id="name" className="form-control" onChange={this.handleChange} value={this.state.parentData.name} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input required type="email" id="email" className="form-control" onChange={this.handleChange} value={this.state.parentData.email} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="phoneNumber">PhoneNumber</label>
                                        <input required type="tel" id="phoneNumber" className="form-control" onChange={this.handleChange} value={this.state.parentData.phoneNumber} />
                                    </div>
                                </div>
                            </div>
                            {/* row 1: relationship */}
                            <div className="form-row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="relationship">Relationship</label>
                                        <input required type="text" id="relationship" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Save</button>
                            </div>
                        </div>
                        <div className="col-12 col-lg-3">
                            <h3>Childs</h3>

                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // updateParentData: (newPsw) => dispatch(updatePassword(newPsw))
    }
}

const mapStateToProps = (state) => {
    return {
        firebase: state.firebase,
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditParentData)
