import Login from './auth/pages/Login.vue'
import Recovery from './recovery/pages/Recovery.vue'
import Register from './register/pages/Register.vue'
import Me from './profile/pages/Profile.vue'
import UserAdmin from './admin/pages/UsersAdmin.vue'
import PasswordChange from "./recovery/pages/PasswordChange";
import Logout from "./auth/pages/Logout";
import Activation from "./register/pages/Activation";

import GroupCrud from './groups/pages/GroupCrud.vue'
import DashboardAdmin from "./dashboard/pages/DashboardAdmin";

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
            role: "admin"
        }
    },
    {
        name: "usersAdmin",
        path: '/admin/users',
        component: UserAdmin,
        meta: {
            requiresAuth: true,
            role: "admin"
        }
    },
    {
        name: "groupCrud",
        path: '/groups',
        component: GroupCrud,
        meta: {
            requiresAuth: true,
            role: "admin"
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
