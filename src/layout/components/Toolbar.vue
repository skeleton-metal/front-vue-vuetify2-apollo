<template>
    <v-toolbar color="primary" dark fixed app clipped-left>
        <v-toolbar-side-icon @click.stop="$emit('drawer',!drawer)"></v-toolbar-side-icon>
        <toolbar-logo title="EKIDS"></toolbar-logo>
        <v-spacer></v-spacer>
        <slot name="toolbar"></slot>
    </v-toolbar>
</template>

<script>
    import ToolbarLogo from './ToolbarLogo'

    export default {
        name: "Toolbar",
        components:{
            ToolbarLogo
        },
        props:{
            drawer: Boolean
        }
    }
</script>

<style scoped>

</style>