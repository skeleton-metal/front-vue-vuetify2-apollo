<template>

    <v-card class="elevation-12 ">

        <v-card-text class="pt-4 px-8 my-0 pb-0 text-center">
            <v-btn fab dark color="primary">
                <v-icon>lock</v-icon>
            </v-btn>
            <h2 class="mt-3">Recuperar Contraseña</h2>
        </v-card-text>

        <v-card-text>
            <v-form ref="form" autocomplete="off" v-model="valid" @submit.prevent="submit">
                <v-text-field prepend-icon="email"
                              name="email"
                              label="Email"
                              type="text"
                              v-model="form.email"
                              :rules="validations.email"
                              placeholder="Email"
                              description="asd"
                              :error="status"
                              :error-messages="message"
                              required
                />
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-row justify="center">
                <v-btn rounded
                       :loading="loading"
                       color="primary darken-1"

                       dark
                       @click="submit">Enviar Solicitud
                </v-btn>
            </v-row>

        </v-card-actions>
    </v-card>

</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: "recoveryForm",
        data: () => ({
                valid: true,
                form: {
                    email: null,
                },
                errors: {
                    email: [],
                },
                validations: {
                    email: [
                        v => !!v || 'Email es requerido',
                        v => /.+@.+/.test(v) || 'Email debe tener un formato valido '
                    ],
                }
            }
        ),
        computed: {
            ...mapState({
                loading: state => state.recovery.loadingUserRecovery,
                status: state => state.recovery.recoveryStatus,
                message: state => state.recovery.recoveryMessage
            }),

        },
        methods: {
            ...mapActions([
                'recoveryPassword',
            ]),
            resetValidation: function () {
                this.errors = {
                    email: [],
                }
            },
            submit() {
                this.resetValidation()
                if (this.$refs.form.validate()) {
                    this.recoveryPassword(this.form.email)
                }
            },

        }
    }
</script>

<style scoped>

</style>