<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="pa-3">
                <user-data-table></user-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import UserDataTable from '../components/UserDataTable'

    export default {
        name: "UsersAdmin",
        components: {
            UserDataTable
        }
    }
</script>

<style scoped>

</style>
