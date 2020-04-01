<template>

    <v-menu offset-y left>
        <template v-slot:activator="{on}">
            <v-toolbar-items>

                <v-btn icon large v-on="on">
                    <v-avatar
                            :tile="tile"
                            :size="avatarSize"
                            color="grey lighten-4"

                    >
                        <img  v-if="me.avatarurl" :src="me.avatarurl"/>
                        <img  v-else src="@/assets/user.png">
                    </v-avatar>

                </v-btn>

            </v-toolbar-items>
        </template>
        <v-list subheader>

            <v-list-item>

                <v-list-item-content>
                    <v-list-item-title>{{getUsername}}</v-list-item-title>
                    <v-list-item-subtitle>{{getEmail}}</v-list-item-subtitle>
                </v-list-item-content>


            </v-list-item>


            <v-divider></v-divider>

            <v-list-item :to="{name: 'me'}">
                <v-list-item-title>Perfil</v-list-item-title>
            </v-list-item>

            <v-list-item @click="logout">
                <v-list-item-title>Cerrar Sesión</v-list-item-title>
            </v-list-item>

        </v-list>


    </v-menu>

</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "AppBarUserMenu",
        data: () => ({
            src: '@/assets/user.png',
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
