import Home from './composment/pages/Home';
import SignIn from './composment/auth/Signin';
import SignUp from './composment/auth/Signup';
import UserProfile from './composment/auth/UserProfile';

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
    },
    {
        path: '/signup',
        component: SignUp,
        name: 'Sign up',
        permission: {
            deny: true,
            allow: [roles.UnAuth],
            redirect: '/'
        }
    },
    {
        path: '/profile',
        component: UserProfile,
        name: 'User Profile',
        permission: {
            allow: true,
            deny: [roles.UnAuth]
        },
        hideOnNav: true
    }
];

export default routes;