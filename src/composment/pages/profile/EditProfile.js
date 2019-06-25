import React, { Component } from 'react'
import { connect } from 'react-redux'

export class EditProfile extends Component {

    componentDidMount() {

        // load props to state when component mount
        this.setState({
            profile: {
                ...this.state.profile,
                ...this.props.profile
            }
        })
    }

    componentWillReceiveProps(newProps) {

        // load props to state when props update
        if (newProps.profile !== this.props.profile) {
            this.setState({
                profile: {
                    ...this.state.profile,
                    ...newProps.profile
                }
            })
        }
    }

    state = {
        profile: {
            username: '',
            displayName: '',
            name: '',
            address: '',
            email: '',
            birthday: new Date()
        },
        defaultSchool: "CMSH",
        requireParent: true
    }

    handleChange = (e) => {
        this.setState({
            profile: {
                ...this.state.profile,
                [e.target.id]: e.target.value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    getDateStr = (date) => {
        if (!(date instanceof Date)) date = new Date(date.seconds * 1000);
        let m = date.getMonth() + 1;
        let d = date.getDate();
        return date.getFullYear() + "-" + (m >= 10 ? m : '0' + m) + "-" + (d >= 10 ? d : '0' + d);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12 col-lg-10">
                        <form onSubmit={this.handleSubmit} className="mb-5">
                            <h3>Your Profile</h3>
                            <div className="row">
                                <div className="col-lg-1"></div>
                                <div className="col-12 col-lg-10">
                                    {/* row 0: uid, email */}
                                    <div className="form-row">
                                        <div className="col">
                                            <div className=" form-group row">
                                                <label htmlFor="uid" className="col-sm-2 col-form-label">UID</label>
                                                <div className="col-sm-10">
                                                    <input readOnly className="form-control-plaintext" type="text" id="uid" value={this.props.firebase.auth.uid} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group row">
                                                <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                                <div className="col-sm-10">
                                                    <input readOnly className="form-control-plaintext" type="text" id="email" value={this.state.profile.email} />
                                                </div>
                                                <a className="col-sm-12 badge badge-primary" href="/profile/editEmail">Click here to change email.</a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* row 1: names */}
                                    <div className="form-row">
                                        <div className="col col-md-6 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="username">Username</label>
                                                <input className="form-control" type="text" id="username" value={this.state.profile.username} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col col-md-6 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="displayName">DisplayName</label>
                                                <input className="form-control" type="text" id="displayName" value={this.state.profile.displayName} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col col-md-6 col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="name">Name</label>
                                                <input className="form-control" type="text" id="name" value={this.state.profile.name} onChange={this.handleChange} />
                                                <small className="form-text text-muted">Please use your realname (Chinese) for this field.</small>
                                            </div>
                                        </div>
                                    </div>

                                    {/*row 2: address and birthday */}
                                    <div className="form-row">
                                        <div className="col col-lg-8">
                                            <div className="form-group">
                                                <label htmlFor="address">Address</label>
                                                <input className="form-control" type="text" id="address" value={this.state.profile.address} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="birthday">Birthday</label>
                                                <input className="form-control" type="date" id="birthday" value={this.getDateStr(this.state.profile.birthday)} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                    </div>

                                    {/*row 3: phone numbers */}
                                    <h4><span className="badge badge-dark">Phone numbers</span></h4>
                                    <div className="form-row">
                                        <div className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="homePhone">Home</label>
                                                <input className="form-control" type="tel" id="homePhone" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="mobilePhone">Mobile</label>
                                                <input className="form-control" type="tel" id="mobilePhone" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                    </div>

                                    {/*row 4: school data */}
                                    <h4><span className="badge badge-dark">School data</span></h4>
                                    {/*row 4.1: type, school, id */}
                                    <div className="form-row">
                                        <div className="col col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="schoolDataType">Type</label>
                                                <select id="schoolDataType" className="form-control" onChange={this.handleChange} defaultValue="Choose...">
                                                    <option>Choose...</option>
                                                    <option>...</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="school">School</label>
                                                <input className="form-control" type="text" id="school" onChange={this.handleChange} />
                                                <small className="form-text text-muted">Left blank if you school is <strong>{this.state.defaultSchool}</strong>.</small>
                                            </div>
                                        </div>
                                        <div className="col col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="schoolId">ID</label>
                                                <input className="form-control" type="text" id="schoolId" onChange={this.handleChange} />
                                                <small className="form-text text-muted">Student id or teacher id...</small>
                                            </div>
                                        </div>
                                    </div>
                                    {/*row 4.2: department, number */}
                                    <div className="form-row">
                                        <div className="col col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="schoolDepartment">Department</label>
                                                <input className="form-control" type="text" id="schoolDepartment" onChange={this.handleChange} />
                                                <small className="form-text text-muted">Class name for student.</small>
                                            </div>
                                        </div>
                                        <div className="col col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="schoolNmber">Number</label>
                                                <input className="form-control" type="number" id="schoolNmber" onChange={this.handleChange} />
                                                <small className="form-text text-muted">Only needed if you are student.</small>
                                            </div>
                                        </div>
                                    </div>

                                    {/*row 5: parent data */}
                                    <div>
                                        <h4 style={{ display: "inline" }}>
                                            <span className="badge badge-dark d-inline">Parent data</span>
                                        </h4>
                                        <h5 className="ml-3" style={{ display: "inline" }}>
                                            {
                                                this.state.requireParent ?
                                                    (false ?
                                                        <span className="badge badge-success">Passed, verified by <strong>Alex</strong></span>
                                                        : (
                                                            true ?
                                                                <span className="badge badge-default">Pending</span>
                                                                : <span className="badge badge-danger">Rejected</span>
                                                        ))
                                                    : <span className="badge badge-default">No need</span>
                                            }
                                        </h5>
                                    </div>
                                    <div className={this.state.requireParent ? null : "d-none"}>
                                        <div className="form-row">
                                            <div className="col col-lg-4">
                                                <div className=" form-group row">
                                                    <label htmlFor="parentName" className="col-sm-2 col-form-label">Name</label>
                                                    <div className="col-sm-10">
                                                        <input readOnly className="form-control-plaintext" type="text" id="parentName" value={"James"} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col col-lg-8">
                                                <div className=" form-group row">
                                                    <label htmlFor="parentRelationship" className="col-sm-2 col-form-label">Relationship</label>
                                                    <div className="col-sm-10">
                                                        <input readOnly className="form-control-plaintext" type="text" id="parentRelationship" value={"Father"} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const mapStateToProps = (state) => {
    console.log(state.firebase);
    return {
        firebase: state.firebase,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
