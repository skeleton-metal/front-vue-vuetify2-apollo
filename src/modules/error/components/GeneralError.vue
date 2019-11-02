<template>
    <v-snackbar v-model="error" color="danger">
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
            error: {
                get: function() {
                    return this.generalError
                },
                set: function() {
                    this.$store.commit('clearGeneralError')
                },
            },
            ...mapState({
                generalError: state => state.error.generalError,
                generalErrorText: state => state.error.generalErrorText,
            })
        }
    }
</script>

<style scoped>

</style>