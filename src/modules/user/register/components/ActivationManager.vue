<template>
    <v-container fluid fill-height class="grey lighten-3">
        <v-row>
            <v-col md="6" sm="12" class="offset-md-3" v-if="tokenExpire && !getInvalidTokenActivation">
                <v-card class="elevation-8">
                    <v-card-text>
                        <div v-if="getLoadingUserRegister">
                            <v-skeleton-loader
                                    ref="skeleton"
                                    :boilerplate="false"
                                    :type="'list-item-avatar-three-line'"
                                    :tile="false"
                                    class="mx-auto"
                            ></v-skeleton-loader>
                        </div>
                        <div v-else>
                            <v-alert :value="true" :color="colorAlert" class="ma-0" icon="check_circle" outlined>
                                {{getMessageActivation}}
                            </v-alert>
                        </div>

                    </v-card-text>
                </v-card>
            </v-col>
            <v-col md="6" sm="12" class="offset-md-3" v-else>
                <div v-if="getInvalidTokenActivation">
                    <v-alert
                            dense
                            type="error"
                            class="elevation-8"
                            prominent
                    >
                        <h4>El token no es valido para activar tu contraseña</h4>
                    </v-alert>
                </div>
                <div v-else>
                    <v-alert
                            dense
                            type="error"
                            class="elevation-8"
                            prominent
                    >
                        <h4>El token ya expiro para activar tu contraseña</h4>
                        Contactese con un administrador para activar su cuenta
                    </v-alert>
                </div>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "ActivationManager",
        data: () => {
            return {
                tokenExpire: true
            }
        },
        computed: {
            ...mapGetters(['getInvalidTokenActivation', 'getExpireTokenMessageActivation', 'getLoadingUserRegister',
                'getStatusActivation', 'getMessageActivation']),

            colorAlert() {
                if (this.getStatusActivation) {
                    return "success"
                }
                return "error"
            }
        },
        methods: {
            ...mapActions(['checkTokenActivation']),
        },
        mounted() {
            this.checkTokenActivation(this.$route.params.token)
        },
        watch: {
            getExpireTokenMessageActivation: function (value) {
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