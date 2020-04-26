<template>
    <v-container fluid fill-height class="grey lighten-3">
       <login></login>
    </v-container>
</template>

<script>
    import Login from "../components/Login";

    export default {
        name: "LoginPage",
        components: {Login},
    }
</script>
