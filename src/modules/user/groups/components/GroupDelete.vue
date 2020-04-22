<template>
    <v-card>

        <v-toolbar flat dark color="primary">
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn icon dark @click="$emit('closeDialog')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-card-text>
          <group-show-data :item="item" />
        </v-card-text>

        <v-card-text>
            <v-alert v-if="errorMessage" type="error" dense text>{{errorMessage}}</v-alert>
        </v-card-text>

        <v-card-text>
            <v-row justify="center">
                <span class="title">{{areYouSure}}</span>
            </v-row>
        </v-card-text>


        <v-card-actions>
            <v-btn color="grey" tile outlined @click="$emit('closeDialog')">
                Cerrar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="secondary" class="onSecondary--text" @click="remove" :loading="loading">
                Confirmar
            </v-btn>
        </v-card-actions>

    </v-card>
</template>

<script>
    import GroupShowData from "./GroupShowData";
     import GroupProvider from "../providers/GroupProvider";
     
    export default {
        name: "GroupDelete",
        components: {GroupShowData},
        props: {
            item: Object
        },
        data() {
            return {
                modal: false,
                title: "Borrando Group",
                areYouSure: "¿Esta seguro que desea borrar este registro?",
                errorMessage: '',
                loading: false,
            }
        },
        methods: {
            remove() {
                GroupProvider.deleteGroup(this.item.id).then(result => {
                            if (result.data.groupDelete.deleteSuccess) {
                                this.$emit('itemDelete',result.data.groupDelete)
                                this.$emit('closeDialog')
                            }else{
                                this.errorMessage = 'Error on Delete'
                            }
                        }
                    ).catch(err =>{
                    this.errorMessage = err.message
                })
            },
        },
    }
</script>


