<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" md="3">
                <v-card>
                    <v-card-title>Admin Users</v-card-title>
                    <v-card-subtitle>Read, create, update and delete Users</v-card-subtitle>
                </v-card>
            </v-col>

            <v-col cols="12" md="3">
                <v-card>
                    <v-card-title>Users By Role</v-card-title>
                    <v-card-subtitle>Ammount of users group by role</v-card-subtitle>
                </v-card>
            </v-col>

            <v-col cols="12" md="3">
                <v-card>
                    <v-card-title>Logins</v-card-title>
                    <v-card-subtitle>Success and Failed last 24hs</v-card-subtitle>
                </v-card>
            </v-col>


        </v-row>

        <v-row>

             <v-col cols="12" md="6">
                <sessions-by-user/>
            </v-col>


            <v-col cols="12" md="3">
                <v-card>
                    <v-card-title>Sessions by OS</v-card-title>
                    <v-card-subtitle>Sessions quantity by OS (30 days)</v-card-subtitle>
                </v-card>
            </v-col>


            <v-col cols="12" md="3">
                <v-card>
                    <v-card-title>Sessions by Client</v-card-title>
                    <v-card-subtitle>Sessions quantity by client (30 days)</v-card-subtitle>
                </v-card>
            </v-col>

            <v-col cols="12" md="3">
                <v-card>
                    <v-card-title>Sessions by Device</v-card-title>
                    <v-card-subtitle>Sessions quantity by Device (30 days)</v-card-subtitle>
                </v-card>
            </v-col>

            <v-col cols="12" md="3">
                <v-card>
                    <v-card-title>Sessions by Country</v-card-title>
                    <v-card-subtitle>Sessions quantity by Country (30 days)</v-card-subtitle>
                </v-card>
            </v-col>

            <v-col cols="12" md="3">
                <v-card>
                    <v-card-title>Sessions by City</v-card-title>
                    <v-card-subtitle>Sessions quantity by City (30 days)</v-card-subtitle>
                </v-card>
            </v-col>

            <v-col cols="12" md="3">
                <v-card>
                    <v-card-title>Sessions by IP</v-card-title>
                    <v-card-subtitle>Sessions quantity by IP (30 days)</v-card-subtitle>
                </v-card>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>

    import SessionsByUser from "../components/SessionsByUser";

    export default {
        name: "DashboardAdmin",
        components: {
            SessionsByUser
        }
    }
</script>

