<template>
    <v-card>

        <v-card-title class="title" primary-title>
            <span>{{title}}</span>
        </v-card-title>

        <v-card-text>
            <v-form ref="form" autocomplete="off">

                <v-row row wrap>

                    <v-col cols="12" md="6">
                        <v-text-field
                                prepend-icon="account_box"
                                name="name"
                                label="Nombre y Apellido"
                                type="text"
                                v-model="form.name"
                                placeholder="Nombre y Apellido"
                                class="pa-3"
                                :error="hasFieldInUserErrors('name')"
                                :error-messages="getMessagesInUserErrors('name')"
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-text-field prepend-icon="person"
                                      name="username"
                                      label="Usuario"
                                      type="text"
                                      v-model="form.username"
                                      placeholder="Usuario"
                                      class="pa-3"
                                      autocomplete="new-password"
                                      :rules="[rules.required]"
                                      :error="hasFieldInUserErrors('username')"
                                      :error-messages="getMessagesInUserErrors('username')"
                                      required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-text-field prepend-icon="email"
                                      name="email"
                                      label="Email"
                                      type="text"
                                      class="pa-3"
                                      v-model="form.email"
                                      placeholder="Email"
                                      :rules="[rules.required]"
                                      :error="hasFieldInUserErrors('email')"
                                      :error-messages="getMessagesInUserErrors('email')"
                                      required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
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


                    <v-col cols="12" md="6">
                        <v-select
                                prepend-icon="account_box"
                                class="pa-3"
                                :items="roles"
                                :item-text="'name'"
                                :item-value="'id'"
                                v-model="form.role"
                                label="Rol"
                                :loading="loadingRoles"
                                :rules="[rules.required]"
                                :error="hasFieldInUserErrors('groups')"
                                :error-messages="getMessagesInUserErrors('groups')"
                                required
                        ></v-select>
                    </v-col>

                    <v-col cols="12" md="6" class="pl-4">
                        Activo
                        <v-switch input-value="0" v-model="form.active"></v-switch>
                    </v-col>

                </v-row>


            </v-form>
        </v-card-text>


        <v-card-actions>

            <v-btn rounded color="grey" text @click="$emit('closeDialog')">
                Cerrar
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn rounded color="primary" @click="saveUser" :loading="loadingUsers">
                Actualizar
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
                title: "Editando Usuario",
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
            this.fetchRoles()
            this.form = {
                id: this.user.id,
                username: this.user.username,
                name: this.user.name,
                email: this.user.email,
                phone: this.user.phone,
                role: this.user.role.id,
                active: this.user.active
            };
        },
        computed: {
            ...mapState({
                roles: state => state.admin.roles,
                loadingUsers: state => state.admin.loadingUsers,
                loadingRoles: state => state.admin.loadingRoles,
            }),
            ...mapGetters(['hasFieldInUserErrors', 'getMessagesInUserErrors']),
        },
        methods: {
            ...mapActions(['updateUser', 'fetchRoles']),
            saveUser() {
                if (this.$refs.form.validate()) {
                    this.updateUser(this.form).then(r => {
                            if (r) {
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