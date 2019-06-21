import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import routes from './routes'
import { connect } from 'react-redux'
import permissionCheck from './composment/auth/permissionCheck'
import roles from './constant/userRoles'

class PageRouter extends Component {
    render() {

        let role = roles.UnAuth;
        if (this.props.auth.uid != undefined) {
            role = roles.Student;
        }

        return (
            <Switch>
                {routes.map((route, i) => {
                    const { path, exact, routes, permission } = route;
                    return (
                        <Route
                            key={i}
                            path={path}
                            exact={exact}
                            render={(routeProps) => {
                                if (permission) {
                                    if (!permissionCheck(permission, role)) {
                                        if (permission.redirect) {
                                            return (<Redirect to={permission.redirect} />);
                                        } else {
                                            return (<Redirect to="/login" />);
                                        }
                                    } else {
                                        return (<route.component routes={routes} {...routeProps} />);
                                    }
                                } else {
                                    return (<route.component routes={routes} {...routeProps} />);
                                }
                            }}
                        />
                    );
                })}
            </Switch>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(PageRouter);