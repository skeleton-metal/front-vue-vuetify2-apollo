<template>
    <v-container fill-height>
        <v-row justify="center" align="center">
            <h1>{{title}}</h1>
        </v-row>
    </v-container>
</template>

<script>


    export default {
        name: 'Home',
        props: {},
        data() {
            return {
                title: "HOME",
            }
        }
    }
</script>

<style scoped>

</style>
