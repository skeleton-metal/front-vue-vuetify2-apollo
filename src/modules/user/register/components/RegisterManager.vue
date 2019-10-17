<template>
    <register-successful v-if="isAccountCreated" :email="confirmationEmail"></register-successful>
    <register-form v-else ></register-form>
</template>

<script>

    import {mapState} from 'vuex'


    import RegisterForm from "./RegisterForm";
    import RegisterSuccessful from "./RegisterSuccessful";

    export default {
        name: "RegisterManager",
        components: {RegisterSuccessful, RegisterForm},
        computed: {
            ...mapState({
                isAccountCreated: state => state.register.accountCreated,
                confirmationEmail:  state => state.register.confirmationEmail,
            }),
        }

    }
</script>

<style scoped>
</style>
