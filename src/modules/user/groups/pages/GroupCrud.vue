<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="pa-3">
               <group-data-table />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import GroupDataTable from "../components/GroupDataTable";
    export default {
        name: "Group",
        components: {GroupDataTable}
    }
</script>

<style scoped>

</style>

