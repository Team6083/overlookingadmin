import Home from './composment/pages/Home';
import SignIn from './composment/auth/Signin';
import SignUp from './composment/auth/Signup';
import UserProfile from './composment/pages/profile/UserProfile';

import { roles } from './constant/userRoles';

import UserList from './composment/pages/user/userList';
import EditUser from './composment/pages/user/editUser';
import CreateUser from './composment/pages/user/createUser';

import AppList from './composment/pages/app/appList';

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
        name: 'Users',
        exact: true
    },
    {
        path: '/users/editUser',
        component: EditUser,
        name: 'User/EditUser',
        hideOnNav: true
    },
    {
        path: '/users/createUser',
        component: CreateUser,
        name: 'User/CreateUser',
        hideOnNav: true
    },
    {
        path: '/apps',
        component: AppList,
        name: 'Apps',
        exact: true
    }
];

export default routes;