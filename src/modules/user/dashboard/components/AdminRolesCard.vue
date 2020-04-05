<template>
    <v-card :to="{name:'rolesAdmin'}">
        <v-row class="ma-0" >
            <v-col cols="3" >
                    <!--<v-img  aspect-ratio="1" contain src="@/assets/roles.png" />-->
                <v-icon size="68" color="purple">verified_user</v-icon>
            </v-col>
            <v-col cols="9">
                <v-card-title class="subtitle-1 pl-0  pt-0"  v-t="'user.adminRoleTitle'" ></v-card-title>
                <v-card-subtitle class="pl-0 pb-0" v-t="'user.adminRoleDescription'"></v-card-subtitle>
            </v-col>

        </v-row>
        <v-btn color="purple" class="mb-n-10" bottom right absolute text ><v-icon>arrow_forward</v-icon></v-btn>

    </v-card>

</template>
<script>


    export default {
        name: 'adminRolesCard',
        data() {
            return {}
        },
        created() {
        }
    }
</script>
