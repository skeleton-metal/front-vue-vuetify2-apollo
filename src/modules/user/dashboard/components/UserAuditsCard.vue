<template>
    <v-card >
        <v-card-title v-t="'user.userAudit'"></v-card-title>


        <v-card-text v-if="data.length > 0">
            <v-simple-table dense class="text-center">
                <template v-slot:default>
                    <thead>
                    <tr class="text-center">
                        <th class="text-center" v-t="'user.when'"></th>
                        <th class="text-center" v-t="'user.actionBy'"></th>
                        <th class="text-center" v-t="'user.actionFor'"></th>
                        <th class="text-center" v-t="'user.action'"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in data" :key="item.id">
                        <td>{{ getDate(item.date) }}</td>
                        <td>{{ item.actionBy?item.actionBy.username:'' }}</td>
                        <td>{{ item.actionFor?item.actionFor.username:'' }}</td>
                        <td>{{ item.action }}</td>
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
    import moment from 'moment'
    import 'moment-timezone'

    export default {
        name: 'userAuditsCard',
        props: {
            data: Array
        },
        computed: {
            getDate() {
                return date => date?moment(parseInt(date)).tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD hh:mm:ss'):""
            }
        }
    }
</script>
