<template>
    <v-card class="elevation-12">

        <v-toolbar dark color="cyan darken-4">
            <v-toolbar-title>Recuperar Contraseña</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-card-text>
            <v-form ref="form" autocomplete="off" v-model="valid" @submit.prevent="submit">
                <v-text-field prepend-icon="email"
                              name="email"
                              label="Email"
                              type="text"
                              v-model="form.email"
                              :rules="validations.email"
                              placeholder="Email"
                              :error="status"
                              :error-messages="message"
                              required
                />
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn round
                   :loading="loading"
                   color="cyan darken-4"
                   dark
                   @click="submit">Enviar
            </v-btn>
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