<template>
    <div>
        <v-form ref="form" autocomplete="off" @submit.prevent="save">
            <v-card shaped class="my-3">
                <v-card-title>
                    <div>Colores</div><br>
                </v-card-title>
                <v-card-subtitle>
                    Configurar preferencia de colores
                </v-card-subtitle>
                <v-card-text class="pb-0 ">
                    <v-row>
                        <v-col cols="12" sm="6" md="3">
                            <color-input v-model="form.primary" label="Primary" color="primary"
                                         :get-message-errors="getMessageErrors('primary')"
                                         :has-errors="hasErrors('primary')"
                                         :rules="[rules.required]"
                            />
                        </v-col>


                        <v-col cols="12" sm="6" md="3">
                            <color-input v-model="form.onPrimary" label="OnPrimary" color="onPrimary"
                                         :get-message-errors="getMessageErrors('onPrimary')"
                                         :has-errors="hasErrors('onPrimary')"
                                         :rules="[rules.required]"
                            />
                        </v-col>

                        <v-col cols="12" sm="6" md="3">
                            <color-input v-model="form.secondary" label="Secondary" color="secondary"
                                         :get-message-errors="getMessageErrors('secondary')"
                                         :has-errors="hasErrors('secondary')"
                                         :rules="[rules.required]"
                            />
                        </v-col>

                        <v-col cols="12" sm="6" md="3">
                            <color-input v-model="form.onSecondary" label="OnSecondary" color="onSecondary"
                                         :get-message-errors="getMessageErrors('onSecondary')"
                                         :has-errors="hasErrors('onSecondary')"
                                         :rules="[rules.required]"
                            />
                        </v-col>

                    </v-row>
                </v-card-text>

                <v-card-text class="pt-0 ">
                    <v-row justify="center" align-content="center">
                            <div class="colorBox mr-1" style="display: inline-block"
                                 :style="getStyleColor('primary','onPrimary')">
                                PRIMARY COLOR
                            </div>
                            <div class="colorBox ml-1" style="display: inline-block"
                                 :style="getStyleColor('secondary','onSecondary')">
                                SECONDARY COLOR
                            </div>
                    </v-row>
                </v-card-text>
            </v-card>

            <v-card shaped class="my-3">
                <v-card-title>
                    Logo
                </v-card-title>
                <v-card-subtitle>
                    Subi el logo
                </v-card-subtitle>
            </v-card>


            <v-card shaped class="my-3">
                <v-card-title>
                    Idioma
                </v-card-title>
                <v-card-subtitle>
                    Selecciona el idioma por defecto de la plataforma
                </v-card-subtitle>
            </v-card>

        </v-form>
    </div>
</template>

<script>
    import ColorInput from "./ColorInput";

    export default {
        name: "CustomizationConfig",
        components: {ColorInput},
        data() {
            return {
                modal: false,
                title: "Creando Customization",
                errorMessage: '',
                inputErrors: {},
                loading: false,
                menu: {
                    primary: false,
                    onPrimary: false,
                    secondary: false,
                    onSecondary: false,
                },
                form: {
                    primary: '',
                    onPrimary: '',
                    secondary: '',
                    onSecondary: '',
                    logo: '',
                    language: ''
                },
                rules: {
                    required: value => !!value || 'Requerido'
                },

            }
        },
        computed: {
            getStyleColor() {
                return (color, onColor) => "background-color: " + this.form[color] + "; color: " + this.form[onColor]
            },
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
    }
</script>

<style scoped>
    .colorBox {
        border: 1px solid grey;
        font-weight: bold;
        padding: 5px;
    }
</style>
