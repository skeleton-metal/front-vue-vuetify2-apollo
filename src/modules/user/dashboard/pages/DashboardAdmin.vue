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
                <sessions-by-user-card :data="sessionsByUser"/>
            </v-col>

            <v-col cols="12" md="3">
                <login-fail-by-username-card/>
            </v-col>


        </v-row>


        <v-row>

            <v-col cols="12" md="3">
                <device-chart :data="sessionsByDeviceType"></device-chart>
            </v-col>

            <v-col cols="12" md="3">
                <os-chart :data="sessionsByOs"></os-chart>
            </v-col>
            <v-col cols="12" md="3">
                <client-chart :data="sessionsByClient"></client-chart>
            </v-col>


            <v-col cols="12" md="6">
                <country-map-chart :data="sessionsByCountry"></country-map-chart>
            </v-col>

            <v-col cols="12" md="6">
                <city-chart :data="sessionsByCity"></city-chart>
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
    import DeviceChart from "../components/DeviceTypeChart";
    import CountryMapChart from "../components/CountryMapChart";
    import SessionProvider from "../providers/SessionProvider";
    import OsChart from "../components/OsChart";
    import ClientChart from "../components/ClientChart";
    import CityChart from "../components/CityChart";

    export default {
        name: "DashboardAdmin",
        components: {
            CityChart,
            ClientChart,
            OsChart,
            CountryMapChart,
            DeviceChart,
            AdminRolesCard,
            AdminGroupsCard,
            AdminUsersCard,
            LoginFailByUsernameCard,
            SessionsByUserCard
        },
        data(){
          return {
              sessionsByUser: [],
              sessionsByCountry: [],
              sessionsByDeviceType: [],
              sessionsByOs: [],
              sessionsByClient: [],
              sessionsByCity: [],
          }
        },
        created() {
            SessionProvider.sessionsBy().then(r => {
                console.log(r)
                this.sessionsByUser = r.data.sessionsByUser
                this.sessionsByCountry = r.data.sessionsByCountry
                this.sessionsByOs = r.data.sessionsByOs
                this.sessionsByDeviceType = r.data.sessionsByDeviceType
                this.sessionsByClient = r.data.sessionsByClient
                this.sessionsByCity = r.data.sessionsByCity
            })
        }
    }
</script>

