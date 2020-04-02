<template>
    <v-card>
        <v-card-title>Sessions</v-card-title>
        <v-card-subtitle>Statistics of sessions by user last 30 days</v-card-subtitle>
        <v-card-text>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-left">Username</th>
                        <th class="text-left">Qty</th>
                        <th class="text-left">Max</th>
                        <th class="text-left">Min</th>
                        <th class="text-left">Avg</th>
                        <th class="text-left">Sum</th>
                        <th class="text-left">Last</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in rows" :key="item.name">
                        <td>{{ item.username }}</td>
                        <td>{{ item.count }}</td>
                        <td>{{ getTime(item.max) }}</td>
                        <td>{{ getTime(item.min) }}</td>
                        <td>{{ getTime(item.average) }}</td>
                        <td>{{ getTime(item.sum) }}</td>
                        <td>{{ getTime(item.last) }}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>
    </v-card>
</template>
<script>

    import SessionProvider from "../providers/SessionProvider";

    export default {
        name: 'sessions-duration',
        data() {
            return {
                rows: []
            }
        },
        computed: {
            getTime() {
                return seconds => {
                    if (seconds < 60) {
                        return seconds + ' s'
                    }
                    return Math.round(seconds / 60) + ' m'
                }
            }
        },
        created() {
            SessionProvider.sessionsByUser().then(r => {
                console.log(r)
                this.rows = r.data.sessionsByUser
            })
        }
    }
</script>
