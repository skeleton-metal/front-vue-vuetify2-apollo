<template>

    <v-container v-if="isAuth" fluid fill-height class="grey lighten-3">
                <v-card class="col-lg-4 offset-lg-4 col-md-6 offset-md-3 offset-sm-2 col-sm-8 col-xs-12 offset-xs-0 elevation-12" width="100%">

                    <v-card-text class="text-center">
                        <profile-image :me="me"/>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-text>
                        <profile-view :me="me"/>
                    </v-card-text>

                    <v-card-text class="text-center pt-0 pb-3">
                        <v-btn rounded @click="openDialog">
                            <v-icon left>lock</v-icon>
                            Cambiar Contraseña
                        </v-btn>
                    </v-card-text>
                </v-card>

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