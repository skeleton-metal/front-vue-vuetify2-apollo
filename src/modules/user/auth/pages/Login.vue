<template>
    <v-container fluid fill-height class="grey lighten-3">

        <v-row align="center" justify="center">
            <v-col cols="12" sm="7" md="5" lg="4">
                <v-card class="elevation-12 ">

                    <v-card-text class="pt-4 px-8 my-0 pb-0 text-center">
                        <v-btn fab class="onPrimary--text" color="primary">
                            <v-icon>lock</v-icon>
                        </v-btn>
                        <h2 class="mt-2" v-t="'user.signIn'" ></h2>
                    </v-card-text>

                    <v-card-text class="pt-5 pb-0 px-8">
                        <v-alert
                                :value="userInvalid"
                                type="error"

                                class="mb-3 pa-3"
                        >
                            {{generalError}}
                        </v-alert>
                    </v-card-text>

                    <v-card-text class="pt-5 px-8 pb-0">

                        <v-form @keyup.enter.native="loginUser">

                            <v-text-field prepend-icon="person"
                                          name="username"
                                          :label="$t('user.form.username')"
                                          type="text"
                                          v-model="loginForm.username"
                                          :placeholder="$t('user.form.username')"
                                          outlined
                                          color="secondary"
                            >

                            </v-text-field>

                            <v-text-field id="password"
                                          prepend-icon="vpn_key"
                                          name="password"
                                          :label="$t('user.form.password')"
                                          type="password"
                                          v-model="loginForm.password"
                                          :placeholder="$t('user.form.password')"
                                          outlined
                                          color="secondary"
                            >

                            </v-text-field>

                        </v-form>
                    </v-card-text>

                    <v-card-actions class="px-8 pt-0">
                        <v-btn
                                :loading="loading"
                                color="secondary"
                                min-width="100%"
                                class="onSecondary--text"
                                @click="loginUser" v-t="'user.signIn'">
                        </v-btn>
                    </v-card-actions>

                    <v-card-text class="text-xs-left pt-2 pl-8 mt-0">
                        <router-link class="secondary--text font-weight-bold" :to="{name: 'recovery'}" v-t="'user.forgotPassword'"></router-link>
                    </v-card-text>
                </v-card>

                <v-card class="elevation-12 mt-2">
                    <v-card-text class="text-xs-center" >
                        <span v-t="'user.stillNotUser'"> </span>
                        <router-link :to="{name: 'register'}" class="secondary--text font-weight-bold" v-t="'user.signUp'"> </router-link>
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
                userInvalid: state => state.auth.userInvalid,
                generalError: state => state.auth.generalError
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
