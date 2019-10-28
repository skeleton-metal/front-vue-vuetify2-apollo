<template>
    <v-container fluid fill-height class="grey lighten-3">

        <v-row align="center" justify="center">
            <v-col cols="12" sm="7" md="5" lg="4">
                <v-card class="elevation-12 ">

                    <v-card-text class="pt-4 px-8 my-0 pb-0 text-center">
                        <v-btn fab dark color="primary">
                            <v-icon>lock</v-icon>
                        </v-btn>
                        <h2 class="mt-2">Iniciar Sesión</h2>
                    </v-card-text>

                    <v-card-text class="pt-5 px-8 pb-0">

                        <v-alert
                                :value="userInvalid"
                                type="error"
                                outlined

                                class="mb-3"
                        >
                            Usuario o Contraseña invalida
                        </v-alert>


                        <v-form @keyup.enter.native="loginUser">


                            <v-text-field prepend-icon="person"
                                          name="username"
                                          label="Usuario"
                                          type="text"
                                          v-model="loginForm.username"
                                          placeholder="Usuario"
                                          outlined
                            >

                            </v-text-field>

                            <v-text-field id="password"
                                          prepend-icon="vpn_key"
                                          name="password"
                                          label="Contraseña"
                                          type="password"
                                          v-model="loginForm.password"
                                          placeholder="Contraseña"
                                          outlined
                            >

                            </v-text-field>

                        </v-form>
                    </v-card-text>

                    <v-card-actions class="px-8 pt-0">
                        <v-btn
                                :loading="loading"
                                color="primary"
                                min-width="100%"
                                dark
                                @click="loginUser">
                            Iniciar Sesión
                        </v-btn>
                    </v-card-actions>

                    <v-card-text class="text-xs-left pt-2 pl-8 mt-0">
                        <router-link to="recovery">Olvido su contraseña?</router-link>
                    </v-card-text>
                </v-card>

                <v-card class="elevation-12 mt-2">
                    <v-card-text class="text-xs-center">
                        Aun no tienes cuenta?
                        <router-link to="register" class="font-weight-black">CREAR CUENTA</router-link>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapActions, mapState, mapGetters} from 'vuex'

    export default {
        name: "Login",
        data: () => {
            return {
                loginForm: {
                    "username": null,
                    "password": null
                }
            }
        },
        created() {
            if (this.isAuth) {
                this.$router.push({name: "home"})
            }
        },
        computed: {
            ...mapState({
                loading: state => state.auth.loadingAuth,
                userInvalid: state => state.auth.userInvalid
            }),
            ...mapGetters(['isAuth'])
        },
        methods: {
            ...mapActions(['login', 'me']),

            loginUser() {
                this.login(this.loginForm)
            }
        }
    }
</script>