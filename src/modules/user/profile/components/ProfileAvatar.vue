<template>

    <v-avatar
            :tile="tile"
            :size="avatarSize"
            color="grey lighten-4"
            slot="activator"
            v-on:mouseover="hover = true"
            v-on:mouseleave="hover = false"
            v-on:click="$emit('avatarClick')"

    >
        <img style="position: absolute" v-if="me.avatarurl" :src="me.avatarurl"/>
        <img style="position: absolute" v-else src="@/assets/user.png">

        <img v-show="hover || loading" style="position: absolute" v-if="me.avatarurl" :src="me.avatarurl"/>
        <img v-show="hover || loading" style="position: absolute" v-else src="@/assets/user.png">

        <v-progress-circular
                v-if="loading"
                :size="50"
                color="primary"
                indeterminate
        ></v-progress-circular>

        <v-col v-show="hover" style="position: relative; cursor:pointer;" class="grey--text">
            <v-icon class="grey--text">photo_camera</v-icon>
            <br>
            <span class="font-weight-bold">Cambiar Foto</span>
        </v-col>
    </v-avatar>


</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "ProfileAvatar",
        data: () => ({
            src: '@/assets/user.png',
            avatarSize: 120,
            tile: false,
            hover: false
        }),
        methods: {
            ...mapActions([
                'logout'
            ])
        },
        computed: {
            getSrc: function () {
                if (this.me.avatarurl) {
                    return this.me.avatarurl
                } else {
                    return this.src
                }
            },
            getUsername: function () {
                return this.me.username
            },
            ...mapState({
                me: state => state.auth.me,
                loading: state => state.profile.loadingUserProfile
            })
        }
    }
</script>

<style scoped>

</style>
