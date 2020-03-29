<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="pa-3">
            <customization-config></customization-config>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import CustomizationConfig from "../components/CustomizationConfig";
    export default {
        name: "Customization",
        components: {CustomizationConfig}
    }
</script>

<style scoped>

</style>

