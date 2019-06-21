import Home from './composment/pages/Home';

import roles from './constant/userRoles';

const routes = [
    {
        path: "/",
        exact: true,
        component: Home,
        name: 'Home',
        permission: {
            allow: true
        }
    }
];

export default routes;