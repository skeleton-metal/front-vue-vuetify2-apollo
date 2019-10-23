<template>
    <v-container fluid fill-height class="grey lighten-3">
        <v-row>
            <v-col md="6" sm="12" class="offset-md-3">
                <v-card
                        class="mx-auto elevation-8"
                >
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Recuperacion de contraseña</v-toolbar-title>
                        <v-spacer></v-spacer>

                    </v-toolbar>
                    <v-card-text class="pb-1">
                        <h4>Ingrese su nueva contaseña</h4>
                        <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                        >
                            <v-row>
                                <v-col cols="12">

                                    <v-text-field
                                            v-model="form.password"
                                            label="Contraseña"
                                            placeholder="Contraseña"
                                            required
                                            :rules="[rules.required]"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                            v-model="form.passwordVerify"
                                            label="Repetir Contraseña"
                                            placeholder="Repetir Contraseña"
                                            required
                                            :rules="[rules.required]"
                                            :error-messages="passwordMatchError"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="success"
                                rounded
                                :disabled="!valid"
                                @click="save"
                        >
                            Actualizar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "PasswordChange",
        data: () => {
            return {
                valid: true,
                form: {
                    password: null,
                    passwordVerify: null
                },
                rules: {
                    required: value => !!value || 'Requerido'
                }
            }
        },
        computed: {
            passwordMatchError() {
                return (this.form.password === this.form.passwordVerify) ? '' : 'Contraseña no coincide'
            },
        },
        methods: {
            save() {
                if (this.$refs.form.validate()) {
                    console.log(this.form)
                }
            }
        }
    }
</script>

<style scoped>

</style>