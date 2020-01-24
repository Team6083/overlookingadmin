import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import MUIDataTable from 'mui-datatables'
import { firestoreConnect } from 'react-redux-firebase'

export class userList extends Component {
    state = {
        users: [],

    }

    componentWillReceiveProps(newProps) {
        if (newProps.users !== this.props.users) {
            let users = newProps.users;

            users.forEach((val, i) => {
                let user = {
                    ...val
                }

                const keys = Object.keys(user);

                let col = this.columns;
                col = col.filter((val) => {
                    return !keys.includes(val.name);
                });

                col.forEach((k, i) => {
                    val = {
                        ...val,
                        [k.name]: ""
                    }
                });

                users[i] = val;
            })

            this.setState({
                ...this.state,
                users: users
            })
        }
    }

    columns = [
        {
            name: 'id',
            label: 'UID',
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (<span><Link to={"/users/editUser?uid=" + value}>{value}</Link></span>)
                }
            },
        },
        {
            name: "name",
            label: "Name",
            options: {
                filter: false,
            }
        },
        {
            name: "username",
            label: "UserName",
            options: {
                filter: false,
            }
        },
        {
            name: "email",
            label: "Email",
            options: {
                filter: false,
            }
        },
        {
            name: "displayName",
            label: "Disp. Name",
            options: {
                filter: false,
            }
        },
        {
            name: "birthday",
            label: "Birth Day",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'address',
            label: "Address",
            options: {
                filter: false,
                display: false
            }
        }
    ]

    options = {
        filterType: 'multiselect',
        responsive: 'scroll',
        onRowClick: (rowData, rowMeta) => {
            // console.log(rowMeta.rowIndex, rowData);
        }
    };

    render() {

        return (
            <div className="container">
                <MUIDataTable
                    title={"User List"}
                    data={this.state.users}
                    columns={this.columns}
                    options={this.options}
                />
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
        firebase: state.firebase,
        auth: state.auth,
        users: state.firestore.ordered.users
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(userList)
