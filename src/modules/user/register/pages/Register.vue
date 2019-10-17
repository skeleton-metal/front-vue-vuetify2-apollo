<template>

    <register-manager></register-manager>
</template>

<script>
    import {mapGetters} from 'vuex'
    import RegisterManager from "../components/RegisterManager";

    export default {
        name: "Register",
        components: {RegisterManager},
        created() {
            if (this.isAuth) {
            //    this.$router.push({name: "home"})
            }
        },
        computed: {
            ...mapGetters(['isAuth'])
        },
        methods: {}
    }
</script>

<style scoped>

</style>