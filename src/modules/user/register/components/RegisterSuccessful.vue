<template>
    <v-container  fluid fill-height class="grey lighten-3">

        <v-row align="center" justify="center">
            <v-col xs="12" sm="8" md="5">
                <v-card class="elevation-12">
                    <v-card-text>
                        <v-alert
                                :value="true"
                                color="success"
                                icon="check_circle"
                                outlined
                        >
                            Hemos enviado un correo a <strong>{{email}}</strong> para validar y finalizar la creación de su cuenta.
                        </v-alert>

                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-btn @click="clear" color="secondary" v-t="'user.signUpOtherAccount'"></v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        name: "RegisterSuccessful",
        props: {
            email: String
        },
        methods: {
            ...mapMutations(['SET_ACCOUNT_CREATED','SET_REGISTER_FLASH_MESSAGE']),
            clear(){
                this.SET_REGISTER_FLASH_MESSAGE('')
                this.SET_ACCOUNT_CREATED(false)
            }
        }
    }
</script>

<style scoped>

</style>
