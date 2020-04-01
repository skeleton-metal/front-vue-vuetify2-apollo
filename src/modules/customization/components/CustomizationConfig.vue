<template>
    <div v-if="!loading">
        <v-card shaped class="my-3">
            <v-card-title>
                <div v-t="'customization.colors.title'"></div>
                <br>
            </v-card-title>
            <v-card-subtitle v-t="'customization.colors.subtitle'">
            </v-card-subtitle>
            <v-card-text class="pb-0 ">
                <v-form ref="colorsForm" autocomplete="off" @submit.prevent="saveColors">

                    <v-row >
                        <v-col cols="12" sm="6" md="3" class="pb-0">
                            <color-input v-model="formColors.primary" :label="$t('customization.colors.primary')" color="primary"
                                         :get-message-errors="getMessageErrors('primary')"
                                         :has-errors="hasErrors('primary')"
                                         :rules="[rules.required]"
                            />
                        </v-col>


                        <v-col cols="12" sm="6" md="3">
                            <color-input v-model="formColors.onPrimary" :label="$t('customization.colors.onPrimary')" color="onPrimary"
                                         :get-message-errors="getMessageErrors('onPrimary')"
                                         :has-errors="hasErrors('onPrimary')"
                                         :rules="[rules.required]"
                            />
                        </v-col>

                        <v-col cols="12" sm="6" md="3">
                            <color-input v-model="formColors.secondary" :label="$t('customization.colors.secondary')" color="secondary"
                                         :get-message-errors="getMessageErrors('secondary')"
                                         :has-errors="hasErrors('secondary')"
                                         :rules="[rules.required]"
                            />
                        </v-col>

                        <v-col cols="12" sm="6" md="3">
                            <color-input v-model="formColors.onSecondary" :label="$t('customization.colors.onSecondary')" color="onSecondary"
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
                    <v-col cols="12" md="4" lg="4">
                        <v-card>
                            <v-card-title>
                                <div v-t="'customization.preview'"></div>
                            </v-card-title>
                            <v-card-text class="text-center">
                                <v-row>
                                    <v-col cols="6" :style="getStyleColor('primary','onPrimary')">
                                        PRIMARY COLOR
                                    </v-col>
                                    <v-col cols="6" :style="getStyleColor('secondary','onSecondary')">
                                        SECONDARY COLOR
                                    </v-col>
                                </v-row>

                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>


            <v-card-text class="pt-0 ">
                <v-btn @click="saveColors" v-t="'customization.applyButton'"></v-btn>
            </v-card-text>
        </v-card>

        <v-card shaped class="my-3">
            <v-card-title>
                <div v-t="'customization.logo.title'"></div>
            </v-card-title>
            <v-card-subtitle v-t="'customization.logo.subtitle'">
            </v-card-subtitle>

            <v-card-text>
                <v-form ref="logoForm" autocomplete="off" @submit.prevent="saveLogo">

                    <v-row>
                        <v-col cols="12" md="3" lg="3">
                            <v-select
                                    prepend-icon="account_box"
                                    class="pa-3"
                                    :items="modes"
                                    :item-text="'name'"
                                    :item-value="'id'"
                                    v-model="formLogo.mode"
                                    :label="$t('customization.logo.form.mode')"
                                    required
                            ></v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="3" lg="3">
                            <v-text-field
                                    id="title"
                                    prepend-icon="title"
                                    name="title"
                                    :label="$t('customization.logo.form.title')"
                                    :placeholder="$t('customization.logo.form.title')"
                                    type="text"
                                    v-model="formLogo.title"
                                    class="pa-3"
                                    :rules="[rules.required]"
                                    :error="hasErrors('name')"
                                    :error-messages="getMessageErrors('name')"
                            />
                        </v-col>

                        <v-col cols="12" md="3" lg="3" class="text-center">
                            <v-btn v-on:click="pickFile" class="mt-3" v-t="'customization.logo.form.upload'"></v-btn>
                            <input type="file" style="display: none" ref="img" accept="image/*" @change="onFilePicked"/>
                        </v-col>

                    </v-row>
                </v-form>
            </v-card-text>

            <v-card-text class="pt-0 ">
                <v-row justify="center" align-content="center">
                    <v-col cols="12" md="4" lg="4">
                        <v-card>
                            <v-card-title>
                                <div v-t="'customization.preview'"></div>
                            </v-card-title>

                            <LogoView :mode="formLogo.mode" :src="formLogo.url" :title="formLogo.title"/>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-text class="pt-0 ">
                <v-btn @click="saveLogo" v-t="'customization.applyButton'"></v-btn>
            </v-card-text>

        </v-card>


        <v-card shaped class="my-3">
            <v-card-title>
                <div v-t="'customization.lang.title'"></div>
                <br>
            </v-card-title>
            <v-card-subtitle v-t="'customization.lang.subtitle'">
            </v-card-subtitle>
            <v-card-text>
                <v-form ref="langForm" autocomplete="off" @submit.prevent="saveLang">
                    <v-row>
                        <v-col cols="12" md="3" lg="3">
                            <v-select
                                    prepend-icon="account_box"
                                    class="pa-3"
                                    :items="langs"
                                    :item-text="'lang'"
                                    :item-value="'lang'"
                                    v-model="formLang.language"
                                    :label="$t('customization.lang.form.lang')"
                                    required
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-text class="pt-0 ">
                <v-btn @click="saveLang" v-t="'customization.applyButton'"></v-btn>
            </v-card-text>
        </v-card>

    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import CustomizationProvider from "../providers/CustomizationProvider";
    import {
        LOGO_MODE_SQUARE,
        LOGO_MODE_ROUND,
        LOGO_MODE_RECTANGLE,
        LOGO_MODE_ONLYTITLE
    } from '../CustomizationConstants'
    import {ClientError} from 'front-module-commons';
    import ColorInput from "./ColorInput";
    import LogoView from "./LogoView";

    export default {
        name: "CustomizationConfig",
        components: {LogoView, ColorInput},
        created() {
            this.loading = true
            CustomizationProvider.customization().then(r => {
                this.formColors.primary = r.data.customization.colors.primary
                this.formColors.onPrimary = r.data.customization.colors.onPrimary
                this.formColors.secondary = r.data.customization.colors.secondary
                this.formColors.onSecondary = r.data.customization.colors.onSecondary

                this.formLogo.mode = r.data.customization.logo.mode
                this.formLogo.title = r.data.customization.logo.title
                this.formLogo.url = r.data.customization.logo.url

                this.formLang.language = r.data.customization.language

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
                langs: ['es', 'en', 'pt'],

                formLang: {
                    language: null,
                },

                formLogo: {
                    mode: LOGO_MODE_ROUND,
                    title: '',
                    url: null
                },
                formColors: {
                    primary: null,
                    onPrimary: null,
                    secondary: null,
                    onSecondary: null,
                },
                rules: {
                    required: value => !!value || 'Requerido'
                },

            }
        },
        computed: {
            modes(){
              return  [
                  {id: LOGO_MODE_ROUND, name: this.$t('customization.logo.options.round')},
                  {id: LOGO_MODE_SQUARE, name: this.$t('customization.logo.options.square')},
                  {id: LOGO_MODE_RECTANGLE, name: this.$t('customization.logo.options.rectangle')},
                  {id: LOGO_MODE_ONLYTITLE, name: this.$t('customization.logo.options.onlytitle')}
              ]
            },
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
            ...mapMutations([
                'setLogo', 'setLanguage'
            ]),
            saveLang() {
                CustomizationProvider.updateLanguage(this.formLang).then(r => {
                    this.$root.$i18n.locale = r.data.langUpdate.language
                    this.setLanguage(r.data.langUpdate.language)
                }).catch(error => {
                    let clientError = new ClientError(error)
                    this.inputErrors = clientError.inputErrors
                    this.errorMessage = clientError.showMessage
                })
            },
            saveLogo() {
                CustomizationProvider.updateLogo(this.formLogo).then(r => {
                    let logo = r.data.logoUpdate
                    //STORAGE
                    this.setLogo(logo)
                }).catch(error => {
                    let clientError = new ClientError(error)
                    this.inputErrors = clientError.inputErrors
                    this.errorMessage = clientError.showMessage
                })
            },
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
            pickFile() {
                this.$refs.img.click()
            },
            onFilePicked: function (e) {
                let img = e.target.files[0]
                if (this.$refs.logoForm.validate()) {
                    CustomizationProvider.logoUpload(img).then(r => {
                        this.formLogo.url = r.data.logoUpload.url
                    }).catch(error => {
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
