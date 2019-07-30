import Home from './composment/pages/Home';
import SignIn from './composment/auth/Signin';
import SignUp from './composment/auth/Signup';
import UserProfile from './composment/pages/profile/UserProfile';

import roles from './constant/userRoles';

import UserList from './composment/pages/user/userList'

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
    },
    {
        path: '/users',
        component: UserList,
        name: 'Users'
    }
];

export default routes;