<template>
    <v-snackbar
            v-model="snackbar"
            :color="color"
            :timeout="timeout"
    >
        {{message}}
        <v-btn
                dark
                flat
                @click="snackbar = false"
        >
            <v-icon>close</v-icon>
        </v-btn>
    </v-snackbar>
</template>

<script>

    export default {
        name: "Snackbar",
        props: {
            message: String,
            color: {type:String, default: "success"},
            timeout: {type:Number, default: 5000}
        },
        data() {
            return {
                snackbar: false,
            }
        },
        watch: {
            message: function (value) {
                if (value) {
                    this.snackbar = true
                }

            }
        }
    }
</script>

<style scoped>

</style>