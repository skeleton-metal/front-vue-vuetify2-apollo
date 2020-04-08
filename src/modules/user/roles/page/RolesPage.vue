<template>
    <v-container fluid>
        <v-card>

        <v-card-title v-t="'roles.showTitle'" />
            <v-card-text>
            <v-row>
                <v-col cols="8" offset="2">
                    <v-simple-table dense class="text-center">
                        <template v-slot:default>
                            <thead>
                            <tr class="text-center">
                                <th class="text-center headline" v-t="'roles.permission'"></th>
                                <th class="text-center headline" v-for="role in roles" :key="role.id">
                                    {{role.name}}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="permission in permissions" :key="permission">
                                <td>{{$t('roles.permissions.'+permission)}}</td>
                                <td v-for="role in roles" :key="role.id">
                                    <v-icon :color="role.permissions.includes(permission)?'green':'red'">
                                        {{role.permissions.includes(permission)?"check":"close"}}
                                    </v-icon>

                                </td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import RoleProvider from "../provider/RoleProvider";

    export default {
        name: "RolePage",
        components: {},
        data() {
            return {
                permissions: [],
                roles: []
            }
        },
        created() {
            RoleProvider.permissions().then(r => {
                console.log(r)
                this.permissions = r.data.permissions.permissions
            })
            RoleProvider.roles().then(r => {
                this.roles = r.data.roles
            })

        }
    }
</script>

<style scoped>

</style>

