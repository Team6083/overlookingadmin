import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import routes from './routes'

export default class PageRouter extends Component {
    render() {
        return (
            <Switch>
                {routes.map((route, i) => {
                    const { path, exact, routes } = route;
                    return (
                        <Route
                            key={i}
                            path={path}
                            exact={exact}
                            render={(routeProps) => (
                                true
                                    ? <route.component routes={routes} {...routeProps} />
                                    : <Redirect to='/login' />
                            )}
                        />
                    );
                })}
            </Switch>
        )
    }
}
