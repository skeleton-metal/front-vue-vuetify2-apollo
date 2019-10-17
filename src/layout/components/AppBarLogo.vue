<template>

    <router-link to="/">
        <h3 v-if="title" class="white--text">{{title}}</h3>

        <v-avatar
                v-else
                tile
                :size="avatarSize"
                color="grey lighten-4"

        >
            <img :src="logoSrc">
        </v-avatar>
    </router-link>

</template>

<script>
    export default {
        name: "LayoutToolbarLogo",
        props: {
            logoSrc: String,
            title: String,
            avatarSize: {type: Number, default: 40}
        },
    }
</script>

<style scoped>

</style>
