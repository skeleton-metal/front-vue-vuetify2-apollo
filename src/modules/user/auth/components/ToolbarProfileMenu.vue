<template>

    <v-menu offset-y left>
        <v-toolbar-items slot="activator">

            <v-btn icon large>
                <v-avatar
                        :tile="tile"
                        :size="avatarSize"
                        color="grey lighten-4"
                >
                    <img :src="getSrc">
                </v-avatar>

            </v-btn>

        </v-toolbar-items>
        <v-list subheader>

            <v-list-tile avatar>

                <v-list-tile-content>
                    <v-list-tile-title>{{getUsername}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{getEmail}}</v-list-tile-sub-title>
                </v-list-tile-content>


            </v-list-tile>


            <v-divider></v-divider>

            <v-list-tile to="me">
                <v-list-tile-title>Perfil</v-list-tile-title>
            </v-list-tile>

            <v-list-tile @click="logout">
                <v-list-tile-title>Cerrar Sesión</v-list-tile-title>
            </v-list-tile>

        </v-list>


    </v-menu>

</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "ToolbarProfileMenu",
        data: () => ({
            src: '/assets/user.jpg',
            avatarSize: 45,
            tile: false
        }),
        mounted() {
            //TODO put in a better place
            this.checkAuth()
        },
        methods: {
            ...mapActions([
                'logout',
                'checkAuth'
            ])
        },
        computed: {
            getSrc: function () {
                if (this.me && this.me.avatarurl) {
                    return this.me.avatarurl
                } else {
                    return this.src
                }
            },
            getUsername: function () {
                return this.me.username
            },
            getEmail: function () {
                return this.me.email
            },
            ...mapState({
                me: state => state.auth.me,
            })
        }
    }
</script>

<style scoped>

</style>
