<template>


    <v-container v-if="status" fluid fill-height class="grey lighten-3">

        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-card-text>
                        <v-alert
                                :value="true"
                                color="success"
                                icon="check_circle"
                                outlined
                        >
                            {{message}}
                        </v-alert>

                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <v-container v-else fluid fill-height class="grey lighten-3">

        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <recovery-form/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

    import {mapActions, mapState} from 'vuex'
    import RecoveryForm from '../components/RecoveryForm'

    export default {
        name: "Recovery",
        components: {RecoveryForm},
        data: () => ({
                recoverySuccess: false,
                recoveryMessage: '',
            }
        ),
        computed: {
            ...mapState({
                status: state => state.recovery.recoveryStatus,
                message: state => state.recovery.recoveryMessage
            })
        },
        methods: {
          ...mapActions(['resetRecovery'])
        },
        destroyed() {
            this.resetRecovery()
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }
</style>