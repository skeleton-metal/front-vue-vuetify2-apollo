<template>
    <div>
    <h1>{{title}}</h1>
        <v-icon>mdi-home</v-icon>
    </div>
</template>

<script>


    export default {
        name: 'Home',
        props: {},
        data() {
            return {
                title: "MAIN",
            }
        }
    }
</script>

<style scoped>

</style>
