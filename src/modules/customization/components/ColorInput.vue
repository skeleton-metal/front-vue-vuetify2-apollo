<template>
    <v-row>
        <v-col cols="9">
            <v-text-field
                    prepend-icon="palette"
                    :label="label"
                    type="text"
                    v-model="colorValue"
                    :placeholder="label"
                    class="pa-3"
                    :rules="rules"
                    :error="hasErrors"
                    :error-messages="getMessageErrors"
                    required
            ></v-text-field>
        </v-col>

        <v-col cols="3" >
            <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    offset-x
            >
                <template v-slot:activator="{ on }">
                    <v-btn class="mt-5" icon v-on="on"
                           :style="getStyleColor('background-color')">
                        <v-icon>colorize</v-icon>
                    </v-btn>
                </template>
                <v-color-picker v-model="colorValue" class="ma-2"
                                hide-mode-switch></v-color-picker>
            </v-menu>

        </v-col>

    </v-row>
</template>
<script>
    export default {
        name: 'color-input',
        props: {
            value: String,
            color: String,
            label: String,
            getMessageErrors: Array,
            hasErrors: Boolean,
            rules: Array
        },
        data(){
            return{
                menu: false
            }
        },
        computed: {
            colorValue: {
                get(){
                    return this.value
                },
                set(val){
                    this.$vuetify.theme.themes.light[this.color] = val.substring(0,7)
                  this.$emit('input',val.substring(0,7))
                }
            },
            getStyleColor() {
                return (style) => style + ": " + this.value
            },
        }
    }
</script>
<style scoped>
    .colorBox {
        width: 60px;
        height: 30px;
        border: 1px solid grey;
    }
</style>
