<template>

    <v-container v-if="isAuth" fluid fill-height class="grey lighten-3">
        <v-row align-center justify-center>
            <v-col xs12 sm8 md4>
                <v-card class="elevation-12">

                    <v-card-text class="text-xs-center">
                        <profile-image :me="me"/>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-text>
                        <profile-view :me="me"/>
                    </v-card-text>

                    <v-card-text class="text-xs-center pt-0 pb-3">
                        <v-btn round @click="openDialog">
                            <v-icon left>lock</v-icon>
                            Cambiar Contraseña
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <profile-password :openDialog="dialog" :id="me.id" @closeDialog="dialog = false"/>

    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex'
    import ProfileImage from './../components/ProfileImage'
    import ProfilePassword from './../components/ProfilePassword'
    import ProfileView from './../components/ProfileView'

    export default {
        name: "Profile",
        components: {ProfileImage, ProfilePassword, ProfileView},
        data: () => {
            return {
                dialog: false
            }
        },
        computed: {
            ...mapGetters([
                'isAuth',
                'me'
            ]),
        },
        methods: {
            openDialog() {
                this.dialog = true
            }
        }
    }
</script>

<style scoped>

</style>