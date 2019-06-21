import Home from './composment/pages/Home';
import SignIn from './composment/auth/Signin';

import roles from './constant/userRoles';

const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
        name: 'Home',
        permission: {
            allow: true,
            deny: [roles.UnAuth]
        }
    },
    {
        path: '/login',
        component: SignIn,
        name: 'Sign in',
        permission: {
            deny: true,
            allow: [roles.UnAuth],
            redirect: '/'
        }
    }
];

export default routes;