import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { MDBIcon } from 'mdbreact'
import { saveUser } from '../../../store/actions/userActions'
import FullScreenLoadingModal from '../../layout/FullScreenLoadingModal'

export class editUserProfile extends Component {

    componentDidMount() {
        // load props to state when component mount

        this.setState({
            profile: {
                ...this.state.profile,
                ...this.props.user
            },
            emailVerified: this.props.firebase.auth.emailVerified
        })
    }

    componentWillReceiveProps(newProps) {
        // load props to state when props update

        let newState = {
            ...this.state
        }

        if (newProps.user !== this.props.user) {
            newState = {
                ...newState,
                profile: {
                    ...this.state.profile,
                    ...newProps.user
                }
            }
        }

        this.setState(newState);
    }

    state = {
        profile: {
            username: '',
            displayName: '',
            name: '',
            address: '',
            email: '',
            birthday: new Date(),
            phoneNumbers: {
                home: '',
                mobile: ''
            },
            schoolData: {
                department: '',
                id: '',
                school: '',
                type: ''
            }
        },
        defaultSchool: "CMSH",
        requireParent: false,
        //TODO: get options from setting
        emailVerified: null
    }

    handleChange = (e) => {
        let ids = e.target.id.split('.');
        let data = e.target.value;

        for (let i = ids.length - 1; i >= 0; i--) {
            data = {
                [ids[i]]: data,
            }
        }

        this.setState({
            ...this.state,
            profile: {
                ...this.state.profile,
                ...data
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let uid = this.props.targetUID;
        this.props.saveUserProfile(this.state.profile, uid);
    }

    getDateStr = (date) => {
        if ((typeof date) == "string") return date;
        if (!(date instanceof Date)) date = new Date(date.seconds * 1000);
        let m = date.getMonth() + 1;
        let d = date.getDate();
        return date.getFullYear() + "-" + (m >= 10 ? m : '0' + m) + "-" + (d >= 10 ? d : '0' + d);
    }

    render() {
        return (
            <div>
                <FullScreenLoadingModal open={this.props.user == undefined} />
                <form onSubmit={this.handleSubmit} className="mb-5">
                    <div className="row">
                        <div className="col-lg-1"></div>
                        <div className="col-12 col-lg-10">
                            {/* row 0: uid, email */}
                            <div className="form-row">
                                <div className="col">
                                    <div className=" form-group row">
                                        <label htmlFor="uid" className="col-sm-2 col-form-label">UID</label>
                                        <div className="col-sm-10">
                                            <input readOnly className="form-control-plaintext" type="text" id="uid" value={this.props.targetUID} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                        <div className="col-sm-10">
                                            <div className="input-group">
                                                <input readOnly className="form-control-plaintext" type="text" id="email" value={this.state.profile.email} />
                                                <div className="input-group-append">
                                                    {this.state.emailVerified ? <MDBIcon far className="green-text" icon="check-circle" /> : <MDBIcon className="amber-text" icon="exclamation-circle" />}
                                                </div>
                                            </div>
                                        </div>
                                        {/* FIXME: fix email verified and edit email */}
                                        <Link className={"col-sm-12 badge badge-primary"} to="/profile/editEmail">Click here to change email.</Link>
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
                                        <label htmlFor="phoneNumbers.home">Home</label>
                                        <input className="form-control" type="tel" id="phoneNumbers.home" value={this.state.profile.phoneNumbers.home} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="col col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="phoneNumbers.mobile">Mobile</label>
                                        <input className="form-control" type="tel" id="phoneNumbers.mobile" value={this.state.profile.phoneNumbers.mobile} onChange={this.handleChange} />
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
                                        <select id="schoolData.type" className="form-control" value={this.state.profile.schoolData.type} onChange={this.handleChange}>
                                            <option>Choose...</option>
                                            <option>...</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="school">School</label>
                                        <input className="form-control" type="text" id="schoolData.school" value={this.state.profile.schoolData.school} onChange={this.handleChange} placeholder={this.state.defaultSchool} />
                                        <small className="form-text text-muted">Left blank if you school is <strong>{this.state.defaultSchool}</strong>.</small>
                                    </div>
                                </div>
                                <div className="col col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="schoolData.id">ID</label>
                                        <input className="form-control" type="text" id="schoolData.id" value={this.state.profile.schoolData.id} onChange={this.handleChange} />
                                        <small className="form-text text-muted">Student id or teacher id...</small>
                                    </div>
                                </div>
                            </div>
                            {/*row 4.2: department, number */}
                            <div className="form-row">
                                <div className="col col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="schoolData.department">Department</label>
                                        <input className="form-control" type="text" id="schoolData.department" value={this.state.profile.schoolData.department} onChange={this.handleChange} />
                                        <small className="form-text text-muted">Class name for student.</small>
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
                                            : <span className="badge badge-default">n/a</span>
                                        //TODO: change "n/a" to "No need"
                                    }
                                </h5>
                            </div>
                            <div className={this.state.requireParent ? null : "d-none"}>
                                <div className="form-row mt-2">
                                    <div className="col col-lg-4">
                                        <div className=" form-group row">
                                            <label htmlFor="parentName" className="col-sm-2 col-form-label">Name</label>
                                            <div className="col-sm-10">
                                                <input readOnly className="form-control-plaintext" type="text" id="parentName" value={"n/a"} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col col-lg-8">
                                        <div className=" form-group row">
                                            <label htmlFor="parentRelationship" className="col-sm-2 col-form-label">Relationship</label>
                                            <div className="col-sm-10">
                                                <input readOnly className="form-control-plaintext" type="text" id="parentRelationship" value={"n/a"} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-primary mt-5" type="submit">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveUserProfile: (profile, uid) => {
            dispatch(saveUser(profile, uid, true));
        }
    }
}

const mapStateToProps = (state, ownProp) => {
    let uid = ownProp.targetUID;
    return {
        firebase: state.firebase,
        user: state.firestore.data.users ? state.firestore.data.users[uid] : undefined,
        editOwn: ownProp.targetUID === state.firebase.auth.uid
    }
}

export default compose(
    firestoreConnect((props) => {
        return [
            { collection: 'users', doc: props.targetUID }
        ];
    }),
    connect(mapStateToProps, mapDispatchToProps)
)(editUserProfile)
