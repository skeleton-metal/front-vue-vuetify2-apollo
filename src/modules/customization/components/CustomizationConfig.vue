<template>
    <div v-if="!loading">
        <v-card shaped class="my-3">
            <v-card-title>
                <div>Colores</div>
                <br>
            </v-card-title>
            <v-card-subtitle>
                Configurar preferencia de colores
            </v-card-subtitle>
            <v-card-text class="pb-0 ">
                <v-form ref="colorsForm" autocomplete="off" @submit.prevent="saveColors">

                    <v-row>
                        <v-col cols="12" sm="6" md="3">
                            <color-input v-model="formColors.primary" label="Primary" color="primary"
                                         :get-message-errors="getMessageErrors('primary')"
                                         :has-errors="hasErrors('primary')"
                                         :rules="[rules.required]"
                            />
                        </v-col>


                        <v-col cols="12" sm="6" md="3">
                            <color-input v-model="formColors.onPrimary" label="OnPrimary" color="onPrimary"
                                         :get-message-errors="getMessageErrors('onPrimary')"
                                         :has-errors="hasErrors('onPrimary')"
                                         :rules="[rules.required]"
                            />
                        </v-col>

                        <v-col cols="12" sm="6" md="3">
                            <color-input v-model="formColors.secondary" label="Secondary" color="secondary"
                                         :get-message-errors="getMessageErrors('secondary')"
                                         :has-errors="hasErrors('secondary')"
                                         :rules="[rules.required]"
                            />
                        </v-col>

                        <v-col cols="12" sm="6" md="3">
                            <color-input v-model="formColors.onSecondary" label="OnSecondary" color="onSecondary"
                                         :get-message-errors="getMessageErrors('onSecondary')"
                                         :has-errors="hasErrors('onSecondary')"
                                         :rules="[rules.required]"
                            />
                        </v-col>

                    </v-row>
                </v-form>

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
            <v-card-text class="pt-0 ">
                <v-btn @click="saveColors">Apply</v-btn>
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

    </div>
</template>

<script>
    import CustomizationProvider from "../providers/CustomizationProvider";
    import {ClientError} from 'front-module-commons';
    import ColorInput from "./ColorInput";

    export default {
        name: "CustomizationConfig",
        components: {ColorInput},
        created() {
            this.loading = true
            CustomizationProvider.customization().then(r => {
                this.formColors.primary = r.data.customization.primary
                this.formColors.onPrimary = r.data.customization.onPrimary
                this.formColors.secondary = r.data.customization.secondary
                this.formColors.onSecondary = r.data.customization.onSecondary
            }).finally(() => this.loading = false)
        },
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
                formColors: {
                    primary: null,
                    onPrimary: null,
                    secondary: null,
                    onSecondary: null,
                },
                form: {
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
                return (color, onColor) => "background-color: " + this.formColors[color] + "; color: " + this.formColors[onColor]
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
        methods: {
            saveColors() {
                if (this.$refs.colorsForm.validate()) {
                    CustomizationProvider.updateColors(this.formColors).then(r => {

                            this.$vuetify.theme.themes.light.primary = r.data.colorsUpdate.primary
                            this.$vuetify.theme.themes.light.onPrimary = r.data.colorsUpdate.onPrimary
                            this.$vuetify.theme.themes.light.secondary = r.data.colorsUpdate.secondary
                            this.$vuetify.theme.themes.light.onSecondary = r.data.colorsUpdate.onSecondary
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
    .colorBox {
        border: 1px solid grey;
        font-weight: bold;
        padding: 5px;
    }
</style>
