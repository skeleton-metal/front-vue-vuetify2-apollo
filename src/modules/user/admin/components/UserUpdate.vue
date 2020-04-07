<template>
    <v-card>

        <v-toolbar flat color="primary">
            <v-toolbar-title class="onPrimary--text">{{title}}</v-toolbar-title>
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

                <v-row row wrap>

                    <v-col cols="12" sm="6">
                        <v-text-field
                                prepend-icon="account_box"
                                name="name"
                                :label="$t('user.form.fullname')"
                                :placeholder="$t('user.form.fullname')"
                                type="text"
                                v-model="form.name"
                                class="pa-3"
                                :error="hasFieldInUserErrors('name')"
                                :error-messages="getMessagesInUserErrors('name')"
                                required
                                color="secondary"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-text-field prepend-icon="person"
                                      name="username"
                                      :label="$t('user.form.username')"
                                      :placeholder="$t('user.form.username')"
                                      type="text"
                                      v-model="form.username"
                                      class="pa-3"
                                      autocomplete="new-password"
                                      :rules="[rules.required]"
                                      :error="hasFieldInUserErrors('username')"
                                      :error-messages="getMessagesInUserErrors('username')"
                                      required
                                      color="secondary"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-text-field prepend-icon="email"
                                      name="email"
                                      :label="$t('user.form.email')"
                                      :placeholder="$t('user.form.email')"
                                      type="text"
                                      class="pa-3"
                                      v-model="form.email"
                                      :rules="[rules.required]"
                                      :error="hasFieldInUserErrors('email')"
                                      :error-messages="getMessagesInUserErrors('email')"
                                      required
                                      color="secondary"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-text-field prepend-icon="phone"
                                      name="phone"
                                      :label="$t('user.form.phone')"
                                      :placeholder="$t('user.form.phone')"
                                      type="text"
                                      class="pa-3"
                                      v-model="form.phone"
                                      :error="hasFieldInUserErrors('phone')"
                                      :error-messages="getMessagesInUserErrors('phone')"
                                      required
                                      color="secondary"
                        >

                        </v-text-field>
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
                                :placeholder="$t('user.form.role')"
                                :loading="loadingRoles"
                                :rules="[rules.required]"
                                :error="hasFieldInUserErrors('groups')"
                                :error-messages="getMessagesInUserErrors('groups')"
                                required
                                color="secondary"
                                item-color="secondary"
                        ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-select
                                v-model="form.groups"
                                :loading="loadingGroups"
                                :items="groups"
                                :item-text="'name'"
                                :item-value="'id'"
                                attach
                                chips
                                :label="$t('user.form.groups')"
                                :placeholder="$t('user.form.groups')"
                                multiple
                        ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6" class="pl-4">
                        Activo
                        <v-switch color="success" input-value="0" v-model="form.active"></v-switch>
                    </v-col>

                </v-row>


            </v-form>
        </v-card-text>


        <v-card-actions>

            <v-btn tile outlined color="grey" text @click="$emit('closeDialog')" v-t="'common.close'">
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn color="secondary" class="onSecondary--text" @click="saveUser" :loading="loadingUsers"
                   v-t="'common.update'">
            </v-btn>

        </v-card-actions>

    </v-card>
</template>

<script>
    import {mapActions, mapState, mapGetters} from 'vuex'

    export default {
        name: "UserUpdate",
        props: {
            user: Object
        },
        data() {
            return {
                title: this.$t('user.updateTitle'),
                form: {
                    id: null,
                    username: '',
                    name: '',
                    email: '',
                    phone: '',
                    role: null,
                    active: false
                },
                rules: {
                    required: value => !!value || 'Requerido'
                }
            }
        },
        created() {
            this.clearErrorMessageAdmin()
            this.fetchRoles()
            this.fetchGroups()

            this.form = {
                id: this.user.id,
                username: this.user.username,
                name: this.user.name,
                email: this.user.email,
                phone: this.user.phone,
                role: this.user.role ? this.user.role.id : null,
                groups: this.user.groups.map(group => group.id),
                active: this.user.active
            };

        },
        computed: {
            ...mapState({
                errorMessage: state => state.admin.errorMessageAdmin,
                roles: state => state.admin.roles,
                groups: state => state.admin.groups,
                loadingUsers: state => state.admin.loadingUsers,
                loadingRoles: state => state.admin.loadingRoles,
                loadingGroups: state => state.admin.loadingGroups,
            }),
            ...mapGetters(['hasFieldInUserErrors', 'getMessagesInUserErrors']),
        },
        methods: {
            ...mapActions(['updateUser', 'fetchRoles', 'fetchGroups', 'clearErrorMessageAdmin']),
            saveUser() {
                if (this.$refs.form.validate()) {
                    this.updateUser(this.form).then((result) => {
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
