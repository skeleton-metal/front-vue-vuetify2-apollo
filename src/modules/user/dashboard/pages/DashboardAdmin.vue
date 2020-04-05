<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" md="4">
                <admin-users-card/>
            </v-col>

            <v-col cols="12" md="4">
                <admin-groups-card/>
            </v-col>

            <v-col cols="12" md="4">
                <admin-roles-card/>
            </v-col>


        </v-row>

        <v-row>


            <v-col cols="12" md="9">
                <sessions-by-user-card/>
            </v-col>

            <v-col cols="12" md="3">
                <login-fail-by-username-card/>
            </v-col>


        </v-row>


        <v-row>
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

    import SessionsByUserCard from "../components/SessionsByUserCard";
    import LoginFailByUsernameCard from "../components/LoginFailByUsernameCard";
    import AdminUsersCard from "../components/AdminUsersCard";
    import AdminGroupsCard from "../components/AdminGroupsCard";
    import AdminRolesCard from "../components/AdminRolesCard";

    export default {
        name: "DashboardAdmin",
        components: {
            AdminRolesCard,
            AdminGroupsCard,
            AdminUsersCard,
            LoginFailByUsernameCard,
            SessionsByUserCard
        }
    }
</script>

