<template>

    <v-card>
        <v-card-text>
            <v-alert :value="true" color="success" icon="check_circle" outline>
                Su contraseña ha sido modificada con exito.
            </v-alert>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" flat="flat" @click="$emit('close')">
                Cerrar
            </v-btn>
        </v-card-actions>
    </v-card>

</template>

<script>

    export default {
        name: "ProfilePasswordConfirm",
    }
</script>

<style scoped>

</style>
