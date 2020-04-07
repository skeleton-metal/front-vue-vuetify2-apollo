<template>
    <v-card height="200">
        <v-card-title v-t="'user.loginFailed'">Login Fails <span class="ml-2 subtitle-1"> (72 hs)</span></v-card-title>
        <v-card-text>
            <v-simple-table dense class="text-center">
                <template v-slot:default>
                    <thead>
                    <tr class="text-center">
                        <th class="text-center">Username</th>
                        <th class="text-center">Attemps</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in rows" :key="item.name">
                        <td>{{ item.username }}</td>
                        <td>{{ item.attempts }}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>
    </v-card>
</template>
<script>

    import LoginFailProvider from "../providers/LoginFailProvider";

    export default {
        name: 'login-fail-by-username',
        data() {
            return {
                rows: []
            }
        },
        created() {
            LoginFailProvider.logginFailByUsername(72, 'hours').then(r => {
                this.rows = r.data.loginFailByUsername
            }).catch(err => {
                console.error(err)
            })
        }
    }
</script>
