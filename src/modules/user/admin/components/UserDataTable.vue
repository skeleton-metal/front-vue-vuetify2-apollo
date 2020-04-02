<template>
    <div>
        <v-card class="elevation-6">

            <v-card-title>
                <v-row>
                    <v-col class="text-xs-center"><h2 v-t="'user.adminTitle'"></h2></v-col>
                </v-row>
            </v-card-title>

            <v-card-text>
                <v-row row wrap>
                    <v-col md6 xs12 class="offset-md6">
                        <v-text-field
                                v-model="search"
                                append-icon="search"
                                :label="$t('common.search')"
                                single-line
                                hide-details
                                class="pa-0 px-2"
                                v-on:keyup.native.enter="updatePage"
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
                        :server-items-length="totalItems"
                        :items-per-page="limit"
                        :loading="loadingUsers"
                        :page.sync="pageNumber"
                        :sort-by.sync="orderBy"
                        :sort-desc.sync="orderDesc"
                        @update:page="updatePage"
                        @update:sort-by="updatePage"
                        @update:sort-desc="updatePage"
                >

                    <template slot="no-data">
                        <div  outline color="info" v-t="'common.noData'"></div>
                    </template>

                    <template slot="loading">
                        <div color="info" outline class="text-xs-center" v-t="'common.loading'"></div>
                    </template>

                    <template v-slot:item.img="{ item }">
                        <v-avatar size="36px">
                            <img v-if="item.avatarurl" :src="item.avatarurl"/>
                            <img v-else src="@/assets/user.png">
                        </v-avatar>
                    </template>

                    <template v-slot:item.active="{ item }">
                        <div v-if="item.active">
                            <v-icon color="success">check_circle</v-icon>
                        </div>
                        <div v-else>
                            <v-icon color="error">highlight_off</v-icon>
                        </div>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-icon
                                small
                                color="info"
                                class="mr-2"
                                @click="openShow(item)"
                        >
                            search
                        </v-icon>
                        <v-icon
                                small
                                color="purple"
                                class="mr-2"
                                @click="openEdit(item)"
                        >
                            edit
                        </v-icon>

                        <v-icon
                                small
                                color="purple"
                                class="mr-2"
                                @click="openChangePassword(item)"
                        >
                            lock
                        </v-icon>
                        <v-icon
                                color="red"
                                small
                                class="mr-2"
                                @click="openDelete(item)"
                        >
                            delete
                        </v-icon>
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

        <v-dialog :value="deleting" width="850" persistent>
            <user-delete v-if="deleting" :user="userToDelete" v-on:closeDialog="deleting=false" v-on:deleteConfirmed="updatePage"></user-delete>
        </v-dialog>

        <v-dialog :value="showing" width="850" persistent>
            <user-show v-if="showing" :item="userToShow" v-on:closeDialog="showing=false"></user-show>
        </v-dialog>

        <v-dialog :value="changePassword" width="500" persistent>
            <user-change-password v-if="changePassword" :user="userToEdit"
                                  v-on:closeDialog="changePassword=false"></user-change-password>
        </v-dialog>


        <snackbar :message="flashMessage"/>

        <v-btn class="elevation-8 onSecondary--text" color="secondary" fab fixed bottom right  @click="openCreate">
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
    import UserDelete from "./UserDelete";
    import UserShow from "./UserShow";

    export default {
        name: "UserDataTable",
        components: {
            UserShow,
            UserDelete,
            UserCreate,
            UserUpdate,
            UserChangePassword,
            Snackbar
        },
        mounted: function () {
            this.paginateUsers(1)
        },
        data() {
            return {
                src: './user.jpg',
                headers: [
                    {text: '', value: 'img', sortable: false},
                    {text: this.$t('user.form.fullname'), value: 'name'},
                    {text: this.$t('user.form.username'), value: 'username'},
                    {text: this.$t('user.form.email'), value: 'email'},
                    {text: this.$t('user.form.phone'), value: 'phone'},
                    {text: this.$t('user.form.role'), value: 'role.name'},
                    {text: this.$t('user.form.active'), value: 'active'},
                    {text: this.$t('user.form.actions'), value: 'action', sortable: false},
                    {text: '', value: 'data-table-expand'},

                ],
                expanded: [],
                search: '',
                dialog: false,
                creating: false,
                updating: false,
                deleting: false,
                showing: false,
                changePassword: false,
                userToEdit: null,
                userToDelete: null,
                userToShow: null,
                expand: false,
                pageNumber: 1,
                orderBy: null,
                orderDesc: false
            }
        },
        computed: {
            ...mapState({
                flashMessage: state => state.admin.flashMessage,
                loadingUsers: state => state.admin.loadingUsers,
                loadingRoles: state => state.admin.loadingRoles,
                users: state => state.admin.users,
                //Pagination
                totalItems: state => state.admin.totalItems,
                limit: state => state.admin.limit
            }),
        },
        methods: {
            ...mapActions(['fetchUsers', 'paginateUsers']),
            openCreate() {
                this.creating = true
                this.dialog = true
            },
            openEdit(user) {
                this.updating = true
                this.userToEdit = user
            },
            openShow(user) {
                this.showing = true
                this.userToShow = user
            },
            openDelete(user) {
                this.deleting = true
                this.userToDelete = user
            },
            openChangePassword(user) {
                this.changePassword = true
                this.userToEdit = user
            },
            updatePage() {
                this.paginateUsers({pageNumber: this.pageNumber, search: this.search, orderBy: this.orderBy, orderDesc: this.orderDesc})
            }
        },

    }
</script>

<style scoped>

</style>
