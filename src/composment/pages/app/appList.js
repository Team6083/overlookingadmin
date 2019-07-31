import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import MUIDataTable from 'mui-datatables'
import { firestoreConnect } from 'react-redux-firebase'

export class appList extends Component {
    state = {
        apps: [],
    }

    componentWillReceiveProps(newProps) {
        if (newProps.apps != this.props.apps) {
            let apps = newProps.apps;

            apps.forEach((val, i) => {
                let app = {
                    ...val
                }

                const keys = Object.keys(app);

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

                apps[i] = val;
            })

            this.setState({
                ...this.state,
                apps: apps
            })
        }
    }

    columns = [
        {
            name: 'id',
            label: 'ID',
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (<span><Link to={"/apps/editApp?id=" + value}>{value}</Link></span>)
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
            name: "description",
            label: "Drscription",
            options: {
                filter: false,
                sort: false
            }
        }
    ]

    options = {
        filterType: 'multiselect',
        responsive: 'scroll',
        onRowClick: (rowData, rowMeta) => {
            console.log(rowMeta.rowIndex, rowData);
        }
    };

    render() {

        return (
            <div className="container">
                <MUIDataTable
                    title={"App List"}
                    data={this.state.apps}
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
        apps: state.firestore.ordered.apps
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'apps' }
    ])
)(appList)
