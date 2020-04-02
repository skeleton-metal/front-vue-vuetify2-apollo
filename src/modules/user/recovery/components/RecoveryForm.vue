<template>

    <v-card class="elevation-12 ">

        <v-card-text class="pt-4 px-8 my-0 pb-0 text-center">
            <v-btn fab class="onPrimary--text" color="primary">
                <v-icon>lock</v-icon>
            </v-btn>
            <h2 class="mt-3" v-t="'user.passwordRecovery'"></h2>
        </v-card-text>

        <v-card-text>
            <v-form ref="form" autocomplete="off" v-model="valid" @submit.prevent="submit">
                <v-text-field prepend-icon="email"
                              name="email"
                              type="text"
                              v-model="form.email"
                              :rules="validations.email"
                              :label="$t('user.form.email')"
                              :placeholder="$t('user.form.email')"
                              description="asd"
                              :error="status"
                              :error-messages="message"
                              color="secondary"
                              required
                />
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-row justify="center">
                <v-btn
                       :loading="loading"
                       color="secondary"
                       class="onSecondary--text"
                       @click="submit" v-t="'common.send'">
                </v-btn>
            </v-row>

        </v-card-actions>
    </v-card>

</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: "recoveryForm",
        data: () => ({
                valid: true,
                form: {
                    email: null,
                },
                errors: {
                    email: [],
                },
                validations: {
                    email: [
                        v => !!v || 'Email es requerido',
                        v => /.+@.+/.test(v) || 'Email debe tener un formato valido '
                    ],
                }
            }
        ),
        computed: {
            ...mapState({
                loading: state => state.recovery.loadingUserRecovery,
                status: state => state.recovery.recoveryStatus,
                message: state => state.recovery.recoveryMessage
            }),

        },
        methods: {
            ...mapActions([
                'recoveryPassword',
            ]),
            resetValidation: function () {
                this.errors = {
                    email: [],
                }
            },
            submit() {
                this.resetValidation()
                if (this.$refs.form.validate()) {
                    this.recoveryPassword(this.form.email)
                }
            },

        }
    }
</script>

<style scoped>

</style>
