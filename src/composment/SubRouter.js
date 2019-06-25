import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

class SubRouter extends Component {
    render() {
        const { routes, perfix } = this.props;

        return (
            <Switch>
                {routes.map((route, i) => {
                    const { path, exact } = route;
                    return (
                        <Route
                            key={i}
                            path={perfix ? (perfix + path) : path}
                            exact={exact}>
                            <route.component />
                        </Route>
                    );
                })}
            </Switch>
        )
    }
}

export default SubRouter;