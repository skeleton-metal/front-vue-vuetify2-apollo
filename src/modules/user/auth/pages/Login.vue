<template>
    <v-container fluid fill-height class="grey lighten-3">

        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Inicio de Sesión</v-toolbar-title>
                        <v-spacer></v-spacer>


                    </v-toolbar>
                    <v-card-text class="pb-0">

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
                            >

                            </v-text-field>

                            <v-text-field id="password"
                                          prepend-icon="lock"
                                          name="password"
                                          label="Contraseña"
                                          type="password"
                                          v-model="loginForm.password"
                                          placeholder="Contraseña"
                            >

                            </v-text-field>

                        </v-form>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn rounded
                               :loading="loading"
                               color="grey"
                               dark
                               @click="loginUser">
                            Iniciar Sesión
                        </v-btn>
                    </v-card-actions>

                    <v-card-text class="text-xs-left pt-0 mt-0">
                        <router-link to="recovery">Olvido su contraseña?</router-link>
                    </v-card-text>
                </v-card>

                <v-card class="elevation-12 mt-3">
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
        created(){
            if(this.isAuth){
                this.$router.push({name:"home"})
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