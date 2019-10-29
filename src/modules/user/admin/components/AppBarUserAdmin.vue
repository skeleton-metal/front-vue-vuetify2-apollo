<template>
    <v-btn v-if="mustShow"
           icon
           to="admin"
           class="mr-3"
    >
        <v-icon>supervised_user_circle</v-icon>
    </v-btn>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "AppBarUserAdmin",
        computed: {
            ...mapGetters(['isAuth', 'hasRole']),
            mustShow() {
                return this.hasRole('admin')
            }
        }
    }
</script>

<style scoped>

</style>