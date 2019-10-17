<template>

    <v-card>
        <v-card-title></v-card-title>

        <v-card-text>
            <v-form ref="form" autocomplete="off" v-model="valid" @submit.prevent="submit">
                <v-text-field id="password"
                              prepend-icon="lock"
                              name="password"
                              label="Nueva Contraseña"
                              type="password"
                              v-model="form.password"
                              :rules="validations.password"
                              placeholder="Nueva Contraseña"
                              autocomplete="new-password"
                              :error="errors.password.length?true:false"
                              :error-messages="errors.password"
                              required
                />

                <v-text-field id="password_verify"
                              prepend-icon="lock"
                              name="password_verify"
                              label="Repetir Nueva Contraseña"
                              type="password"
                              v-model="form.passwordVerify"
                              :rules="validations.password"
                              placeholder="Repetir Nueva Contraseña"
                              autocomplete="new-password"
                              :error="errors.passwordVerify.length?true:false"
                              :error-messages="errors.passwordVerify"
                              required
                />
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn round color="grey darken-1" flat="flat" @click="$emit('close')">
                Cancelar
            </v-btn>

            <v-btn round :loading="loading" color="primary" dark @click="submit">
                Cambiar Contraseña
            </v-btn>

        </v-card-actions>

    </v-card>

</template>

<script>
    import {mapGetters, mapActions, mapState} from 'vuex'

    export default {
        name: "ProfilePasswordForm",
        data: () => ({
                valid: true,
                form: {
                    id: null,
                    password: null,
                    passwordVerify: null,
                },
                errors: {
                    password: [],
                    passwordVerify: []
                },
                validations: {
                    password: [
                        v => !!v || 'Contraseña es requerido',
                    ],
                    passwordVerify: [
                        v => !!v || 'Verificación de contraseña es requerido',
                    ],
                }
            }
        ),
        computed: {
            ...mapGetters([
                'me',
                'getUsersLoading',
                'getChangePassword'
            ]),
            ...mapState({
                loading: s => s.profile.loadingUserProfile,
                status: s => s.profile.changePasswordStatus
            })
        },
        methods: {
            ...mapActions(['changePassword']),

            resetValidation: function () {
                this.errors = {
                    password: [],
                    passwordVerify: []
                }
            },
            submit() {
                this.resetValidation()
                this.form.id = this.me.id
                this.changePassword(this.form)
            },
        }
    }
</script>

<style scoped>

</style>