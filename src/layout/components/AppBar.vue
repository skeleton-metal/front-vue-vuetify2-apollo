<template>

    <v-app-bar
            app
            color="primary"
            dark
            :clipped-left="clipped"
    >
        <v-app-bar-nav-icon class="onPrimary--text" @click.stop="$emit('drawer',!drawer)"/>

        <app-bar-logo/>
        <app-bar-title/>

        <v-spacer></v-spacer>
        <app-bar-user-admin></app-bar-user-admin>
        <app-bar-user></app-bar-user>
        <slot name="toolbar"></slot>

    </v-app-bar>

</template>

<script>
    import AppBarLogo from './AppBarLogo'
    import AppBarUser from './../../modules/user/auth/components/AppBarUser'
    import AppBarUserAdmin from './../../modules/user/admin/components/AppBarUserAdmin'
    import AppBarTitle from "./AppBarTitle";

    export default {
        name: "Toolbar",
        components: {
            AppBarTitle,
            AppBarLogo,
            AppBarUser,
            AppBarUserAdmin
        },

        props: {
            drawer: Boolean,
            title: String,
            logo: String,
            clipped: {type: Boolean, default: false}
        }
    }
</script>

<style scoped>

</style>
