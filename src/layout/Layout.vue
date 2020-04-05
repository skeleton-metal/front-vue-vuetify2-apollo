<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                disable-route-watcher
                app
                temporary
                :mini-variant="miniVariant"
                :clipped="clipped"
                :fixed="fixed"
        >

            <menu-list :nav="nav" v-on:closeDrawer="drawer = false"></menu-list>


        </v-navigation-drawer>

        <app-bar @drawer="setDrawer" :drawer="drawer" title="TITLE"/>

        <v-content class="grey lighten-3">
            <slot></slot>
        </v-content>

        <Footer></Footer>
    </v-app>
</template>

<script>
    import MenuList from './components/MenuList'
    import AppBar from './components/AppBar'
    import Footer from './components/Footer'

    export default {
        components: {MenuList, AppBar, Footer},
        props: {
            nav: {type: Array, default: null},
            title: {type: String, default: "title"},
        },
        methods: {
            setDrawer(value) {
                this.drawer = value
            }
        },
        data: () => ({
                drawer: false,
                clipped: true,
                miniVariant: false,
                fixed: true,
            }
        )
    }
</script>

<style scoped>

</style>
