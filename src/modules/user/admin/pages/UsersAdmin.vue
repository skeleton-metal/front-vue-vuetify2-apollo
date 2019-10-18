<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="pa-3">
                <user-list></user-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import UserList from '../components/UserList'

    export default {
        name: "Users",
        components: {
            UserList
        }
    }
</script>

<style scoped>

</style>