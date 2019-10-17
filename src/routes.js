import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import {userRoutes} from './modules/user/UserRoutes'
import {appRoutes} from './modules/app/AppRoutes'

const routes = [
    ...appRoutes,
    ...userRoutes
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})


export default router
