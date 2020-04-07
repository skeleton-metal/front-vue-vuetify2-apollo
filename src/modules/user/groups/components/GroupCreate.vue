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

        <v-card-text class="pt-3">
            <v-alert v-if="errorMessage" type="error" dense text>{{errorMessage}}</v-alert>
        </v-card-text>

        <v-card-text>
            <v-form ref="form" autocomplete="off" @submit.prevent="save" >

                <v-row>
    
                   
                    <v-col cols="12" sm="6">
                        <v-text-field
                                prepend-icon="account_box"
                                name="name"
                                type="text"
                                v-model="form.name"
                                :label="$t('group.form.name')"
                                :placeholder="$t('group.form.name')"
                                class="pa-3"
                                :rules="[rules.required]"
                                :error="hasErrors('name')"
                                :error-messages="getMessageErrors('name')"
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <group-color-input
                                v-model="form.color"
                                           :label="$t('group.form.color')"
                                           :get-message-errors="getMessageErrors('color')"
                                           :has-errors="hasErrors('color')"
                                           :rules="rules.hexcode"
                        />
                    </v-col>
                    
                </v-row>


            </v-form>
        </v-card-text>


        <v-card-actions>

            <v-btn tile outlined color="grey" @click="$emit('closeDialog')">
                Cerrar
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn color="primary" @click="save" :loading="loading">
                Crear
            </v-btn>

        </v-card-actions>

    </v-card>
</template>

<script>
    import GroupProvider from "../providers/GroupProvider";
    import {ClientError} from 'front-module-commons';
    import GroupColorInput from "./GroupColorInput";
    
    //Relations
    
    
    //Handle Dates
    

    export default {
        name: "GroupCreate",
        components: {GroupColorInput},
        data() {
            return {
                modal: false,
                title: this.$t('group.createTitle'),
                errorMessage: '',
                inputErrors: {},
                loading: false,
                form: {
                    name: '',
                    color: '#37474F'
                },
                rules: {
                    required: value => !!value || 'Requerido',
                    hexcode: [v => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v) || 'hexcode invalid ']
                },
                
            }
        },
        mounted() {
         
        },
        computed: {
             hasErrors() {
                return field => this.inputErrors[field] != undefined
            },
            getMessageErrors() {
                return field => {
                    if (this.inputErrors[field] != undefined) {
                        let message = this.inputErrors[field].message
                        return [message]
                    }
                    return []
                }
            },
        },
        methods: {
            save() {
                if (this.$refs.form.validate()) {
                    this.form.amount = parseFloat(this.form.amount)
                    GroupProvider.createGroup(this.form).then(r => {
                            if (r) {
                                this.$emit('itemCreate',r.data.groupCreate)
                                this.$emit('closeDialog')
                            }
                        }
                    ).catch(error => {
                         let clientError = new ClientError(error)
                         this.inputErrors = clientError.inputErrors
                         this.errorMessage = clientError.showMessage
                    })
                }

            },
            

        },
    }
</script>

<style scoped>

</style>

