<template>
    <v-dialog :value="open" width="800" persistent>
        <v-card>
            <v-card-title class="title" primary-title>
                <span>{{title}}</span>
            </v-card-title>

            <v-card-text>
                <v-form ref="form" autocomplete="off">

                    <v-row row wrap>
                        <v-col xs12 md6>

                            <v-text-field prepend-icon="account_box"
                                          name="name"
                                          label="Nombre y Apellido"
                                          type="text"
                                          v-model="form.firstName"
                                          placeholder="Nombre y Apellido"
                                          class="pa-3"

                                          :error="hasFieldInUserErrors('name')"
                                          :error-messages="getMessagesInUserErrors('name')"

                                          required
                            >

                            </v-text-field>
                        </v-col>

                        <v-col xs12 md6>
                            <v-text-field prepend-icon="person"
                                          name="username"
                                          label="Usuario"
                                          type="text"
                                          v-model="form.username"
                                          placeholder="Usuario"
                                          class="pa-3"
                                          autocomplete="new-password"

                                          :error="hasFieldInUserErrors('username')"
                                          :error-messages="getMessagesInUserErrors('username')"
                                          :disabled="usernameDisable"
                                          required
                            >

                            </v-text-field>
                        </v-col>

                        <v-col xs12 md6>
                            <v-text-field prepend-icon="email"
                                          name="email"
                                          label="Email"
                                          type="text"
                                          class="pa-3"
                                          v-model="form.email"
                                          placeholder="Email"

                                          :error="hasFieldInUserErrors('email')"
                                          :error-messages="getMessagesInUserErrors('email')"

                                          required
                            >

                            </v-text-field>
                        </v-col>

                        <v-col xs12 md6>
                            <v-text-field prepend-icon="phone"
                                          name="phone"
                                          label="Telefono"
                                          type="text"
                                          class="pa-3"
                                          v-model="form.phone"
                                          placeholder="Telefono"

                                          :error="hasFieldInUserErrors('phone')"
                                          :error-messages="getMessagesInUserErrors('phone')"

                                          required
                            >

                            </v-text-field>
                        </v-col>


                        <v-col xs12 md6 v-if="showPassword">
                            <v-text-field id="password"
                                          prepend-icon="lock"
                                          name="password"
                                          label="Contraseña"
                                          type="password"
                                          v-model="form.password"
                                          class="pa-3"
                                          placeholder="Contraseña"
                                          autocomplete="new-password"
                                          ref="password"

                                          :error="hasFieldInUserErrors('password')"
                                          :error-messages="getMessagesInUserErrors('password')"


                                          required
                            >
                            </v-text-field>
                        </v-col>
                        <v-col xs12 md6 v-if="showPassword">
                            <v-text-field id="password_verify"
                                          prepend-icon="lock"
                                          name="password_verify"
                                          label="Repetir Contraseña"
                                          type="password"
                                          v-model="form.password_verify"
                                          placeholder="Repetir Contraseña"
                                          autocomplete="new-password"
                                          class="pa-3"
                                          :error="hasFieldInUserErrors('password2')"
                                          :error-messages="getMessagesInUserErrors('password2')"

                                          required
                            >

                            </v-text-field>
                        </v-col>
                        <v-col xs12 md6>
                            <v-select
                                    prepend-icon="account_box"
                                    class="pa-3"
                                    :items="getRoles"
                                    :item-text="'name'"
                                    :item-value="'id'"
                                    v-model="form.groups"
                                    label="Rol"
                                    attach
                                    chips
                                    multiple
                                    :loading="getRolesLoading"
                                    :rules="rules.role"
                                    :error="hasFieldInUserErrors('groups')"
                                    :error-messages="getMessagesInUserErrors('groups')"

                            ></v-select>
                        </v-col>
                        <v-col xs12 md6 class="pl-4">
                            Activo
                            <v-switch input-value="0" v-model="form.isActive"></v-switch>
                        </v-col>
                    </v-row>


                </v-form>
            </v-card-text>


            <v-card-actions>
                <v-btn round
                       color="grey"
                       flat
                       @click="$emit('closeDialog')"
                >
                    Cerrar
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn round
                       color="primary"
                       @click="saveUser"
                       :loading="getUsersLoading"
                >
                    Guardar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters, mapActions, mapState} from 'vuex'
  //  import cloneByJsonCopy from './../../../helpers/cloneByJsonCopy'

    export default {
        name: "UsersCrudDialog",
        props: {
            open: Boolean,
            title: String,
            user: Object,
            showPassword: Boolean,
            usernameDisable: Boolean,
        },
        mounted: function () {
            this.fetchAllRoles()
            if (this.user.id) {
         //       this.form = cloneByJsonCopy(this.user)
                for (var indice in this.form.groups) {
                    this.form.groups[indice] = this.form.groups[indice].id;
                }

            }
        },
        watch: {
            getResult: function (value) {
                if (value) {
                    this.$emit('closeDialog')
                }
            },
            getErrors: function (value) {
                this.localErrors = Object.assign({}, this.localErrors, value);
            }
        },
        data() {
            return {
                localErrors: {
                    name: [],
                    username: [],
                    password: [],
                    password_verify: [],
                    email: [],
                    phone: [],
                    active: [],
                    groups: []
                },
                form: {
                    firstName: '',
                    username: '',
                    password: '',
                    password_verify: '',
                    email: '',
                    phone: '',
                    groups: [],
                    isActive: false
                }
            }
        },
        methods: {
            ...mapActions(['createUser', 'userUpdate', 'fetchAllRoles']),

            saveUser() {
                if (this.form.isActive == null) {
                    this.form.isActive = false
                }
                if (this.form.id) {
                    this.form.id = parseInt(this.form.id)
                }
                let groups = []
                let flag = false
                this.form.groups.forEach(function (group) {
                    if (group.id) {
                        groups.push(group.id)
                        flag = true
                    }
                })
                if (flag) {
                    this.form.groups = groups
                }

                if (this.form.id) {
                    this.userUpdate(this.form)
                } else {
                    this.createUser(this.form)
                }

            }
        },
        computed: {
            ...mapGetters(['getRoles', 'getRolesLoading', 'getResult', 'getUsersLoading',
                'getErrors', 'hasFieldInUserErrors', 'getMessagesInUserErrors']),
        }
    }
</script>
