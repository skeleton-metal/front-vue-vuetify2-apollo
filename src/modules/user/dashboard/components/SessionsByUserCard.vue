<template>
    <v-card height="200">
        <v-card-title v-t="'user.sessionsByUser'">Sessions <span class="ml-2 subtitle-1"> (30 days)</span></v-card-title>
        <v-card-text>
            <v-simple-table dense class="text-center">
                <template v-slot:default>
                    <thead>
                    <tr class="text-center">
                        <th class="text-center">Username</th>
                        <th class="text-center">Sessions Count</th>
                        <th class="text-center">Duration Max</th>
                        <th class="text-center">Duration Min</th>
                        <th class="text-center">Duration Avg</th>
                        <th class="text-center">Duration Sum</th>
                        <th class="text-center">Duration Last</th>
                        <th class="text-center">Requests Sum</th>
                        <th class="text-center">Requests Avg</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in data" :key="item.name">
                        <td>{{ item.username }}</td>
                        <td>{{ item.sessionCount }}</td>
                        <td>{{ getTime(item.durationMax) }}</td>
                        <td>{{ getTime(item.durationMin) }}</td>
                        <td>{{ getTime(item.durationAvg) }}</td>
                        <td>{{ getTime(item.durationSum) }}</td>
                        <td>{{ getTime(item.durationLast) }}</td>
                        <td>{{ item.requestSum }}</td>
                        <td>{{ Math.floor(item.requestAvg) }}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>
    </v-card>
</template>
<script>

    export default {
        name: 'sessions-duration',
        props: {
          data: Array
        },
        computed: {
            getTime() {
                return seconds => {

                    if(seconds > 3600){
                        return Math.round(seconds / 60 / 60) + ' h'
                    }

                    if (seconds < 60) {
                        return seconds + ' s'
                    }
                    return Math.round(seconds / 60) + ' m'
                }
            }
        }
    }
</script>
