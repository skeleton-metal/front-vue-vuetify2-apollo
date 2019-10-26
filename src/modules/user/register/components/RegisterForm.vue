<template>


    <v-container fluid fill-height class="grey lighten-3">

        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card class="elevation-12">
                    <v-toolbar dark color="secondary">
                        <v-toolbar-title>Crear Cuenta</v-toolbar-title>
                        <v-spacer></v-spacer>


                    </v-toolbar>

                    <v-card-text>
                        <v-alert v-if="flashMessage" type="error" dense text>{{flashMessage}}</v-alert>
                    </v-card-text>

                    <v-card-text>
                        <v-form ref="form" autocomplete="off" v-model="valid">
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field

                                            prepend-icon="account_box"
                                            name="name"
                                            label="Nombre y Apellido"
                                            type="text"
                                            v-model="form.name"
                                            placeholder="Nombre y Apellido"

                                            :rules="[rules.required]"
                                            :error="hasFieldInRegisterErrors('name')"
                                            :error-messages="getMessagesInRegisterErrors('name')"

                                            required
                                    />
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                            xs6
                                            prepend-icon="person"
                                            name="username"
                                            label="Usuario"
                                            type="text"
                                            v-model="form.username"
                                            placeholder="Usuario"
                                            autocomplete="new-password"

                                            :rules="[rules.required]"

                                            :error="hasFieldInRegisterErrors('username')"
                                            :error-messages="getMessagesInRegisterErrors('username')"

                                            required
                                    />
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <v-text-field prepend-icon="email"
                                                  name="email"
                                                  label="Email"
                                                  type="text"
                                                  v-model="form.email"
                                                  placeholder="Email"

                                                  :rules="[rules.required]"
                                                  :error="hasFieldInRegisterErrors('email')"
                                                  :error-messages="getMessagesInRegisterErrors('email')"

                                                  required
                                    />
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <v-text-field prepend-icon="email"
                                                  name="email_verify"
                                                  label="Repetir Email"
                                                  type="text"
                                                  v-model="form.email_verify"
                                                  placeholder="Repetir Email"
                                                  required
                                                  onPaste="return false"

                                                  :rules="[rules.required]"

                                                  :error="emailMatchError == '' ? false : true"
                                                  :error-messages="emailMatchError"

                                    />
                                </v-col>


                                <v-col cols="12" sm="6">
                                    <v-text-field id="password"
                                                  prepend-icon="lock"
                                                  name="password"
                                                  label="Contraseña"
                                                  type="password"
                                                  v-model="form.password"
                                                  placeholder="Contraseña"
                                                  autocomplete="new-password"
                                                  ref="password"

                                                  :rules="[rules.required]"
                                                  :error="hasFieldInRegisterErrors('password')"
                                                  :error-messages="getMessagesInRegisterErrors('password')"

                                                  required
                                    />
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <v-text-field id="password_verify"
                                                  prepend-icon="lock"
                                                  name="password_verify"
                                                  label="Repetir Contraseña"
                                                  type="password"
                                                  v-model="form.password_verify"
                                                  placeholder="Repetir Contraseña"
                                                  autocomplete="new-password"

                                                  :rules="[rules.required]"
                                                  :error="passwordMatchError == '' ? false : true"
                                                  :error-messages="passwordMatchError"
                                    />
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <v-text-field prepend-icon="phone"
                                                  name="phone"
                                                  label="Telefono"
                                                  type="text"
                                                  v-model="form.phone"
                                                  placeholder="Telefono"

                                                  :error="hasFieldInRegisterErrors('phone')"
                                                  :error-messages="getMessagesInRegisterErrors('phone')"
                                    />
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :loading="loading" color="primary" text dark @click="submit">Crear Cuenta</v-btn>
                    </v-card-actions>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>

    import {mapActions, mapGetters, mapState} from 'vuex'

    export default {
        name: "RegisterForm",
        data: () => ({
                valid: true,
                isAccountCreated: false,
                form: {
                    name: null,
                    username: null,
                    password: null,
                    password_verify: null,
                    email: null,
                    email_verify: null,
                    phone: null,
                },
                errors: {
                    name: [],
                    username: [],
                    password: [],
                    password_verify: [],
                    email: [],
                    phone: [],
                },
                rules: {
                    required: value => !!value || 'Requerido'
                },
                validations: {
                    name: [
                        v => !!v || 'Nombre y Apellido es requerido',
                    ],
                    username: [
                        v => !!v || 'Usuario es requerido',
                    ],
                    phone: [
                        v => !!v || 'Telefono es requerido',
                    ],
                    email: [
                        v => !!v || 'Email es requerido',
                        v => /.+@.+/.test(v) || 'Email debe tener un formato valido '
                    ],
                    password: [
                        v => !!v || 'Contraseña es requerido',
                    ]
                }
            }
        ),
        computed: {
            ...mapState({
                loading: state => state.register.loadingUserRegister,
                flashMessage: state => state.register.flashMessageRegister
            }),
            ...mapGetters([
                'hasFieldInRegisterErrors',
                'getMessagesInRegisterErrors'
            ]),
            passwordMatchError() {
                return (this.form.password === this.form.password_verify) ? '' : 'Contraseña no coincide'
            },
            emailMatchError() {
                return (this.form.email === this.form.email_verify) ? '' : 'Email no coincide'
            }
        },
        methods: {
            resetValidation: function () {
                this.valid = true
                //  this.$refs.form.resetValidation()
                this.errors = {
                    name: [],
                    username: [],
                    password: [],
                    email: [],
                    phone: [],
                }
            },

            ...mapActions(['registerUser']),

            submit: function () {

                if (this.$refs.form.validate()) {
                    this.registerUser(this.form).then((result) => {
                        if (result && result.status) {
                            //TODO confirmar creacion de cuenta
                            this.$emit("accountCreated", true)
                            this.isAccountCreated = true

                        }
                    })
                }
            },
            ...mapActions([
                'register',
            ]),
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }
</style>
