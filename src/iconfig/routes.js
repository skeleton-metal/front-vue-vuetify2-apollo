import VueRouter from 'vue-router'


import Home from './../modules/application/pages/Home.vue'

const routes = [
    {name: "home", path: '/', component: Home},
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})


export default router
