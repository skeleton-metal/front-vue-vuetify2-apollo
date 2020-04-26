import Login from './auth/pages/LoginPage.vue'
import Recovery from './recovery/pages/Recovery.vue'
import Register from './register/pages/Register.vue'
import Me from './profile/pages/Profile.vue'
import UserAdmin from './admin/pages/UsersAdmin.vue'
import PasswordChange from "./recovery/pages/PasswordChange";
import Logout from "./auth/pages/Logout";
import Activation from "./register/pages/Activation";

import GroupsPage from './groups/pages/GroupsPage.vue'
import DashboardAdmin from "./dashboard/pages/DashboardAdmin";
import RolesPage from "./roles/page/RolesPage";

export const userRoutes = [

    //USERS
    {
        name: "login",
        path: '/login',
        component: Login
    },
    {
        name: "logout",
        path: '/logout',
        component: Logout
    },
    {
        name: "recovery",
        path: '/recovery',
        component: Recovery
    },
    {
        name: "register",
        path: '/register',
        component: Register
    },
    {
        name: "me",
        path: '/me',
        component: Me,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: "dashboardAdmin",
        path: '/admin/dashboard',
        component: DashboardAdmin,
        meta: {
            requiresAuth: true,
            permission: "SECURITY_DASHBOARD_SHOW"
        }
    },
    {
        name: "usersAdmin",
        path: '/admin/users',
        component: UserAdmin,
        meta: {
            requiresAuth: true,
            permission: "SECURITY_USER_SHOW"
        }
    },
    {
        name: "groupsAdmin",
        path: '/admin/groups',
        component: GroupsPage,
        meta: {
            requiresAuth: true,
            permission: "SECURITY_GROUP_SHOW"
        }
    },
    {
        name: "rolesAdmin",
        path: '/admin/roles',
        component: RolesPage,
        meta: {
            requiresAuth: true,
            permission: "SECURITY_ROLE_SHOW"
        }
    },
    {
        name: "recoveryPassword",
        path: '/reset-password/:token',
        component: PasswordChange,
        meta: {
            requiresAuth: false
        }
    },
    {
        name: "activationUser",
        path: '/activation-user/:token',
        component: Activation,
        meta: {
            requiresAuth: false
        }
    },

]
