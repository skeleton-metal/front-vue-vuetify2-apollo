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
            <v-alert v-if="errorMessage" type="error" dense text>{{errorMessage}}</v-alert>
        </v-card-text>

        <v-card-text>
            <v-form ref="form" autocomplete="off">

                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field
                                prepend-icon="account_box"
                                name="name"
                                type="text"
                                v-model="form.name"
                                :label="$t('user.form.fullname')"
                                :placeholder="$t('user.form.fullname')"
                                class="pa-3"
                                :error="hasFieldInUserErrors('name')"
                                :error-messages="getMessagesInUserErrors('name')"
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-text-field prepend-icon="person"
                                      name="username"
                                      type="text"
                                      v-model="form.username"
                                      :label="$t('user.form.username')"
                                      :placeholder="$t('user.form.username')"
                                      class="pa-3"
                                      autocomplete="new-password"
                                      :rules="[rules.required]"
                                      :error="hasFieldInUserErrors('username')"
                                      :error-messages="getMessagesInUserErrors('username')"
                                      required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-text-field prepend-icon="email"
                                      name="email"
                                      type="text"
                                      class="pa-3"
                                      v-model="form.email"
                                      :label="$t('user.form.email')"
                                      :placeholder="$t('user.form.email')"
                                      :rules="[rules.required]"
                                      :error="hasFieldInUserErrors('email')"
                                      :error-messages="getMessagesInUserErrors('email')"
                                      required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-text-field prepend-icon="phone"
                                      name="phone"
                                      type="text"
                                      class="pa-3"
                                      v-model="form.phone"
                                      :label="$t('user.form.phone')"
                                      :placeholder="$t('user.form.phone')"
                                      :error="hasFieldInUserErrors('phone')"
                                      :error-messages="getMessagesInUserErrors('phone')"
                                      required
                        >

                        </v-text-field>
                    </v-col>


                    <v-col cols="12" sm="6">
                        <v-text-field id="password"
                                      prepend-icon="lock"
                                      name="password"
                                      type="password"
                                      v-model="form.password"
                                      class="pa-3"
                                      :label="$t('user.form.password')"
                                      :placeholder="$t('user.form.password')"
                                      autocomplete="new-password"
                                      ref="password"
                                      :rules="[rules.required]"
                                      :error="hasFieldInUserErrors('password')"
                                      :error-messages="getMessagesInUserErrors('password')"
                                      required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-text-field
                                id="password_verify"
                                prepend-icon="lock"
                                name="password_verify"
                                type="password"
                                v-model="form.password_verify"
                                :label="$t('user.form.password')"
                                :placeholder="$t('user.form.password')"
                                autocomplete="new-password"
                                class="pa-3"
                                :rules="[rules.required]"
                                :error="passwordMatchError == '' ? false : true"
                                :error-messages="passwordMatchError"
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-select
                                prepend-icon="account_box"
                                class="pa-3"
                                :items="roles"
                                :item-text="'name'"
                                :item-value="'id'"
                                v-model="form.role"
                                :label="$t('user.form.role')"
                                :loading="loadingRoles"
                                :rules="[rules.required]"
                                :error="hasFieldInUserErrors('groups')"
                                :error-messages="getMessagesInUserErrors('groups')"
                                required
                        ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6" class="pl-8">
                        <v-switch :label="form.active?'Activo':'Inactivo'" input-value="0"
                                  v-model="form.active"></v-switch>
                    </v-col>

                </v-row>


            </v-form>
        </v-card-text>


        <v-card-actions>

            <v-btn tile outlined color="grey" @click="$emit('closeDialog')" v-t="'common.close'">
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn color="primary" @click="saveUser" :loading="loadingUsers" v-t="'common.create'">
            </v-btn>

        </v-card-actions>

    </v-card>
</template>

<script>
    import {mapActions, mapState, mapGetters} from 'vuex'

    export default {
        name: "UserCreate",
        data() {
            return {
                title: this.$t('user.createTitle'),
                form: {
                    username: '',
                    password: '',
                    password_verify: '',
                    name: '',
                    email: '',
                    phone: '',
                    role: null,
                    active: true
                },
                rules: {
                    required: value => !!value || 'Requerido'
                }
            }
        },
        mounted() {
            this.fetchRoles()
            this.clearErrorMessageAdmin()
        },
        computed: {
            ...mapState({
                errorMessage: state => state.admin.errorMessageAdmin,
                roles: state => state.admin.roles,
                loadingUsers: state => state.admin.loadingUsers,
                loadingRoles: state => state.admin.loadingRoles,
            }),
            ...mapGetters(['hasFieldInUserErrors', 'getMessagesInUserErrors']),
            passwordMatchError() {
                return (this.form.password === this.form.password_verify) ? '' : 'Contraseña no coincide'
            },
        },
        methods: {
            ...mapActions(['createUser', 'fetchRoles', 'clearErrorMessageAdmin']),
            saveUser() {
                if (this.$refs.form.validate()) {
                    this.createUser(this.form).then(result => {
                            if (result) {
                                this.$emit('closeDialog')
                            }
                        }
                    )
                }

            }
        },
    }
</script>

<style scoped>

</style>
