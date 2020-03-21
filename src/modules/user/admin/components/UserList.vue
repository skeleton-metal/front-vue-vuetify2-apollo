<template>
    <div>
        <v-card class="elevation-6">

            <v-card-title>
                <v-row>
                    <v-col class="text-xs-center"><h2>Administración de Usuarios</h2></v-col>
                </v-row>
            </v-card-title>

            <v-card-text>
                <v-row row wrap>
                    <v-col md6 xs12 class="offset-md6">
                        <v-text-field
                                v-model="search"
                                append-icon="search"
                                label="Buscar"
                                single-line
                                hide-details
                                class="pa-0 px-2"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-data-table
                        class="mt-3"
                        :headers="headers"
                        :items="users"
                        :search="search"
                        :single-expand="false"
                        :expanded.sync="expanded"
                        :loading="loadingUsers">

                    <template slot="no-data">

                        <div
                                color="info"
                                outline
                                class="text-xs-center">
                            Cargando usuarios
                        </div>

                        <div v-if="false"
                             outline
                             color="info">
                            Sin datos
                        </div>

                    </template>

                    <template v-slot:item.img="{ item }">
                        <v-avatar size="36px">
                            <img v-if="item.avatarurl" :src="item.avatarurl"/>
                            <img v-else src="@/assets/user.png">
                        </v-avatar>
                    </template>

                    <template v-slot:item.active="{ item }">
                        <div v-if="item.active" >
                            <v-icon color="success">check_circle</v-icon>
                        </div>
                        <div v-else>
                            <v-icon color="error">highlight_off</v-icon>
                        </div>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-icon
                                small
                                class="mr-2"
                                @click="openEdit(item)"
                        >
                            edit
                        </v-icon>
                        <v-icon
                                small
                                class="mr-2"
                                @click="openChangePassword(item)"
                        >
                            lock
                        </v-icon>
                    </template>


                    <template v-slot:expanded-item="props">
                        <td :colspan="headers.length"><b>Telefono: </b>{{ props.item.phone }}</td>

                    </template>

                </v-data-table>
            </v-card-text>
        </v-card>


        <v-dialog :value="creating" width="850" persistent fullscreen>
            <user-create v-if="creating" v-on:closeDialog="creating=false"></user-create>
        </v-dialog>


        <v-dialog :value="updating" width="850" persistent>
            <user-update v-if="updating" :user="userToEdit" v-on:closeDialog="updating=false"></user-update>
        </v-dialog>

        <v-dialog :value="changePassword" width="500" persistent>
            <user-change-password v-if="changePassword" :user="userToEdit" v-on:closeDialog="changePassword=false"></user-change-password>
        </v-dialog>


        <snackbar :message="flashMessage"/>

        <v-btn class="elevation-8" color="primary" fab fixed bottom right dark @click="openCreate">
            <v-icon>add</v-icon>
        </v-btn>
    </div>

</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import Snackbar from "./Snackbar"
    import UserCreate from "./UserCreate"
    import UserUpdate from './UserUpdate'
    import UserChangePassword from './UserChangePassword'

    export default {
        name: "UserCrud",
        components: {
            UserCreate,
            UserUpdate,
            UserChangePassword,
            Snackbar
        },
        mounted: function () {
            this.fetchUsers()
        },
        data() {
            return {
                src: './user.jpg',
                headers: [
                    {text: '', value: 'img', sortable: false},
                    {text: 'Nombre', value: 'name'},
                    {text: 'Usuario', value: 'username'},
                    {text: 'Email', value: 'email'},
                    {text: 'Rol', value: 'role.name'},
                    {text: 'Activo', value: 'active'},
                    {text: 'Aciones', value: 'action', sortable: false},
                    {text: '', value: 'data-table-expand'},

                ],
                expanded: [],
                search: '',
                dialog: false,
                creating: false,
                updating: false,
                changePassword: false,
                userToEdit: null,
                expand: false,
                username: false
            }
        },
        computed: {
            ...mapState({
                flashMessage: state => state.admin.flashMessage,
                loadingUsers: state => state.admin.loadingUsers,
                loadingRoles: state => state.admin.loadingRoles,
                users: state => state.admin.users,
            }),
        },
        methods: {
            ...mapActions(['fetchUsers']),
            openCreate() {
                this.creating = true
                this.dialog = true
            },
            openEdit(user) {
                this.updating = true
                this.userToEdit = user
            },
            openChangePassword(user) {
                this.changePassword = true
                this.userToEdit = user
            }
        },

    }
</script>

<style scoped>

</style>
