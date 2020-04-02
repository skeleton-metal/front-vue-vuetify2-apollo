<template>
    <v-container fluid fill-height class="grey lighten-3">

        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Cierre de Sesión</v-toolbar-title>
                        <v-spacer></v-spacer>


                    </v-toolbar>
                    <v-card-text class="pb-0">
                                       Cerrando sessión....
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn rounded
                               color="primary"
                               class="onPrimary--text"
                               :to="{name: 'login'}" v-t="'user.signIn'">
                        </v-btn>
                    </v-card-actions>

                </v-card>


            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "Logout",
        created(){
            this.logout()
        },
        methods: {
            ...mapActions(['logout']),
        }
    }
</script>
