<template>
    <v-card>

        <v-toolbar  flat dark color="primary">
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn icon dark @click="$emit('closeDialog')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-card-text>
            <user-show-data :item="item"/>
        </v-card-text>


        <v-card-actions>
            <v-btn color="grey" tile outlined @click="$emit('closeDialog')">
                Cerrar
            </v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>

    </v-card>
</template>

<script>
    import UserShowData from "./UserShowData";

    export default {
        name: "UserShow",
        components: {UserShowData},
        props: {
            item: Object
        },
        data() {
            return {
                title: "Detalles de Usuario",
            }
        },
    }
</script>

