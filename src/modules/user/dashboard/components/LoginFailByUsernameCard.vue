<template>
    <v-card height="200">
        <v-card-title v-t="'user.loginFailed'">Login Fails <span class="ml-2 subtitle-1"> (72 hs)</span></v-card-title>


        <v-card-text v-if="data.length > 0">
            <v-simple-table dense class="text-center">
                <template v-slot:default>
                    <thead>
                    <tr class="text-center">
                        <th class="text-center">Username</th>
                        <th class="text-center">Attemps</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in data" :key="item.name">
                        <td>{{ item.username }}</td>
                        <td>{{ item.attempts }}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>

        <v-card-text v-else v-t="'user.noLoginFail'">
        </v-card-text>

    </v-card>
</template>
<script>


    export default {
        name: 'loginFailByUsername',
        props:{
          data: Array
        },
    }
</script>
