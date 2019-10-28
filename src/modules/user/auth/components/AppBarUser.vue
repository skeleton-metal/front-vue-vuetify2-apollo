<template>
    <app-bar-user-menu v-if="isAuth"></app-bar-user-menu>
    <app-bar-user-login v-else></app-bar-user-login>
</template>

<script>
    import AppBarUserLogin from './AppBarUserLogin'
    import AppBarUserMenu from './AppBarUserMenu'
    import {mapGetters} from 'vuex'

    export default {
        name: "AppBarUser",
        components: {AppBarUserLogin, AppBarUserMenu},
        computed: {
            ...mapGetters(['isAuth'])
        }
    }
</script>

<style scoped>

</style>