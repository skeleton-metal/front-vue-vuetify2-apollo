<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                disable-route-watcher
                :fixed="fixed"
                app
                :mini-variant="miniVariant"
                :clipped="clipped"
        >

            <menu-list :nav="nav" v-on:closeDrawer="drawer = false"></menu-list>


        </v-navigation-drawer>

        <Toolbar @drawer="setDrawer" :drawer="drawer" />

            <v-content class="grey lighten-3">
                <slot></slot>
            </v-content>

            <v-footer color="primary" app>
                <span class="white--text"> &copy; 2019</span>
            </v-footer>
    </v-app>
</template>

<script>
    import MenuList from '../components/MenuList'
    import Toolbar from '../components/Toolbar'

    export default {
        components: {MenuList, Toolbar},
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