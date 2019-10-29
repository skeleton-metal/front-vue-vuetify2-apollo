<template>

    <v-app-bar
            app
            color="indigo"
            dark
            :clipped-left="clipped"
    >
        <v-app-bar-nav-icon @click.stop="$emit('drawer',!drawer)"/>

        <v-toolbar-title>
            <app-bar-logo v-if="logo"/>
            <span v-else>{{title}}</span>
        </v-toolbar-title>

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
    export default {
        name: "Toolbar",
        components: {
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