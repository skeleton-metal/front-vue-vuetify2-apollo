<template>
    <v-app>
        <layout :nav="nav" :title="title">
            <router-view></router-view>
        </layout>
        <general-error></general-error>
    </v-app>
</template>

<script>

    import nav from './iconfig/nav'
    import Layout from './layout/pages/Layout'
    import GeneralError from "./modules/error/components/GeneralError";

    export default {
        name: 'App',
        components: {
            GeneralError,
            Layout,
        },
        data() {
            return {
                nav: nav,
                title: 'SKELETON'
            }
        }
    };
</script>
