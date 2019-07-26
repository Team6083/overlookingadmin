import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import NotFound from './layout/errPages/NotFound'

class SubRouter extends Component {
    render() {
        const { routes, redirects, perfix } = this.props;

        return (
            <Switch>
                {redirects.map((redirect, i) => {
                    const { path, to } = redirect;
                    return (
                        <Redirect key={i} from={perfix ? (perfix + path) : path} to={perfix ? (perfix + to) : path} exact />
                    );
                })}
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
                <Route component={NotFound} />
            </Switch>
        )
    }
}

export default SubRouter;