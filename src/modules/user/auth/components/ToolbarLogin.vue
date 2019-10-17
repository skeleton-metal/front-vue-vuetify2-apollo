<template>

    <toolbar-profile-menu v-if="isAuth"></toolbar-profile-menu>
    <v-btn v-else
           flat
           dark
           to="/login"
           round
    >
        Iniciar Sesión
    </v-btn>

</template>

<script>
    import {mapGetters} from 'vuex'
    import ToolbarProfileMenu from './ToolbarProfileMenu'

    export default {
        name: "LoginToolbar",
        components: {ToolbarProfileMenu},
        computed: {
            ...mapGetters(['isAuth'])
        }
    }
</script>

<style scoped>

</style>
