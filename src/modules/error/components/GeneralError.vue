<template>
    <v-snackbar v-model="generalError">
        {{generalErrorText}}
    </v-snackbar>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "GeneralError",
        data: function(){
            return {
                d : true
            }
        },
        computed: {
            ...mapState({
                generalError: state => state.error.generalError,
                generalErrorText: state => state.error.generalErrorText,
            })
        }
    }
</script>

<style scoped>

</style>