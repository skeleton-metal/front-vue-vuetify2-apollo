<template>
    <v-list two-line>
        <v-list-tile>
            <v-list-tile-action>
                <v-icon color="primary">account_box</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
                <v-list-tile-sub-title class="primary--text">Nombre</v-list-tile-sub-title>
                <v-list-tile-title> {{me.firstName}}</v-list-tile-title>

            </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
            <v-list-tile-action>
                <v-icon color="primary">mail</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
                <v-list-tile-sub-title class="primary--text">Email</v-list-tile-sub-title>
                <v-list-tile-title> {{me.email}}</v-list-tile-title>

            </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
            <v-list-tile-action>
                <v-icon color="primary">phone</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
                <v-list-tile-sub-title class="primary--text">Télefono</v-list-tile-sub-title>
                <v-list-tile-title> {{me.phone}}</v-list-tile-title>

            </v-list-tile-content>


        </v-list-tile>
    </v-list>
</template>

<script>
    export default {
        name: "ProfileView",
        props:{
            me: Object
        }
    }
</script>

<style scoped>

</style>