<template>

    <v-card>
        <v-card-title>

        </v-card-title>
        <v-card-text class="ma-0">
            <v-alert :value="true" color="success" class="ma-0" icon="check_circle" outlined>
                Su contraseña ha sido modificada con exito.
            </v-alert>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="$emit('close')">
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
