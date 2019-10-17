<template>

    <v-container fluid fill-height class="grey lighten-3">

        <v-row align-center justify-center>
            <v-col xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="grey">
                        <v-toolbar-title>Validar Cuenta</v-toolbar-title>
                        <v-spacer></v-spacer>


                    </v-toolbar>

                    <v-card-text v-if="getValidate === false">
                        Estamos validando su cuenta
                    </v-card-text>

                    <v-card-text v-else>
                        <v-alert
                                :value="true"
                                color="success"
                                icon="check_circle"
                                outline
                        >
                            El proceso de validación fue exitoso
                        </v-alert>

                    </v-card-text>

                    <v-card-text v-if="getAuthLoading === true">
                        <v-progress-circular
                                indeterminate
                                color="primary"
                        ></v-progress-circular>
                    </v-card-text>

                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>

    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "Validate",
        data: () => ({
                valid: true,
                form: {
                    id: null,
                    token: null
                }

            }
        ),

        mounted: function(){
            this.doValidate()
        },

        computed: {
            ...mapGetters([
                'getValidate',
                'getValidateError',
                'getValidateMessage',
                'getAuthLoading'
            ]),

        },
        methods: {

            doValidate: function () {

                this.form.id = this.$route.params.id
                this.form.token = this.$route.params.token
                this.validate(this.form)
            },

            ...mapActions([
                'validate',
            ]),
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }
</style>