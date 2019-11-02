<template>
    <v-container fluid fill-height class="grey lighten-3">
        <v-row>
            <v-col md="6" sm="12" class="offset-md-3" v-if="tokenExpire && !getInvalidToken">
                <div v-if="!status">
                    <v-card
                            class="mx-auto elevation-8"
                    >

                        <v-card-text class="pt-4 px-8 my-0 pb-0 text-center">
                            <v-btn fab dark color="primary">
                                <v-icon>lock</v-icon>
                            </v-btn>
                            <h2 class="mt-3">Recuperar Contraseña</h2>
                        </v-card-text>

                        <v-card-text class="pb-1">

                            <v-form
                                    ref="form"
                                    v-model="valid"
                                    lazy-validation
                            >
                                <v-row>
                                    <v-col cols="12">

                                        <v-text-field
                                                v-model="form.password"
                                                label="Contraseña"
                                                placeholder="Contraseña"
                                                required
                                                :rules="[rules.required]"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                                v-model="form.passwordVerify"
                                                label="Repetir Contraseña"
                                                placeholder="Repetir Contraseña"
                                                required
                                                :rules="[rules.required]"
                                                :error-messages="passwordMatchError"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                           <v-row justify="center">
                               <v-btn
                                       color="primary"
                                       rounded
                                       :disabled="!valid"
                                       @click="save"
                                       :loading="loading"
                               >
                                   Confirmar
                               </v-btn>
                           </v-row>

                        </v-card-actions>
                    </v-card>
                </div>
                <div v-else>
                    <v-card>
                        <v-card-text class="ma-0">
                            <v-alert :value="true" color="success" class="ma-0" icon="check_circle" outlined>
                                Su contraseña ha sido modificada con exito.
                            </v-alert>
                        </v-card-text>
                    </v-card>
                </div>
            </v-col>
            <v-col md="6" sm="12" class="offset-md-3" v-else>
                <div v-if="getInvalidToken">
                    <v-alert
                            dense
                            type="error"
                            class="elevation-8"
                            prominent
                    >
                        <h4>El token no es valido para cambiar tu contraseña</h4>
                        Realize el procedimiento de recuperar contrasela nuevamente
                    </v-alert>
                </div>
                <div v-else>
                    <v-alert
                            dense
                            type="error"
                            class="elevation-8"
                            prominent
                    >
                        <h4>El token ya expiro para cambiar tu contraseña</h4>
                        Realize el procedimiento de recuperar contrasela nuevamente
                    </v-alert>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex'

    export default {
        name: "PasswordChange",
        data: () => {
            return {
                valid: true,
                form: {
                    password: null,
                    passwordVerify: null
                },
                rules: {
                    required: value => !!value || 'Requerido'
                },
                tokenExpire: true
            }
        },
        computed: {
            ...mapGetters(['getExpireTokenMessage', 'getInvalidToken']),
            ...mapState({
                loading: state => state.profile.loadingUserProfile,
                status: state => state.profile.changePasswordStatus
            }),
            passwordMatchError() {
                return (this.form.password === this.form.passwordVerify) ? '' : 'Contraseña no coincide'
            },
        },
        methods: {
            ...mapActions(['checkToken', 'recoveryPasswordChange']),
            save() {
                if (this.$refs.form.validate()) {
                    this.recoveryPasswordChange(this.form)
                }
            },
            getToken() {
                this.checkToken(this.$route.params.token)
            }
        },
        mounted() {
            this.getToken()
        },
        watch: {
            getExpireTokenMessage: function (value) {
                console.log(value)
                if (value.length > 1) {
                    this.tokenExpire = false
                }
            }
        }
    }
</script>

<style scoped>

</style>