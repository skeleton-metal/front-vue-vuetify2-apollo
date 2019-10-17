<template>
    <v-dialog :value="openDialog" width="500" persistent>

        <password-success v-if="status" @close="$emit('closeDialog')"/>

        <password-form v-else @close="$emit('closeDialog')"/>

    </v-dialog>
</template>

<script>
    import {mapState} from 'vuex'
    import PasswordForm from './ProfilePasswordForm'
    import PasswordSuccess from './ProfilePasswordSuccess'

    export default {
        name: "ProfilePassword",
        components: {
            PasswordForm,
            PasswordSuccess
        },
        props: {
            openDialog: Boolean
        },
        computed: {
            ...mapState({
                loading: state => state.profile.loadingUserProfile,
                status: state => state.profile.changePasswordStatus
            })
        },
    }
</script>

<style scoped>

</style>
