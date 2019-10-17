import Login from './auth/pages/Login.vue'
import Recovery from './recovery/pages/Recovery.vue'
import Register from './register/pages/Register.vue'
import Me from './profile/pages/Profile.vue'
import UserAdmin from './admin/pages/UsersAdmin.vue'

export const userRoutes = [

    //USERS
    {
        name: "login",
        path: '/login',
        component: Login
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
        name: "usersAdmin",
        path: '/admin',
        component: UserAdmin,
        meta: {
            requiresAuth: true,
            role: "administrator"
        }
    }

]