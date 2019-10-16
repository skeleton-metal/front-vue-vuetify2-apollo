<template>
    <v-app>
        <layout :nav="nav" :title="title">
            <router-view></router-view>
        </layout>
    </v-app>
</template>

<script>

    import nav from './iconfig/nav'
    import Layout from './layout/pages/Layout'

    export default {
        name: 'App',
        components: {
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
