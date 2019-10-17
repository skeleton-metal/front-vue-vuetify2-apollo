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

        <slot name="toolbar"></slot>

    </v-app-bar>

</template>

<script>
    import AppBarLogo from './AppBarLogo'

    export default {
        name: "Toolbar",
        components: {
            AppBarLogo
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