import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import routes from './routes'
import { connect } from 'react-redux'
import permissionCheck from './composment/auth/permissionCheck'

class PageRouter extends Component {
    render() {
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
                                    if (!permissionCheck(permission)) {
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
    console.log(state.firebase);
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(PageRouter);