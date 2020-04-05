<template>
    <v-card :to="{name:'usersAdmin'}">
        <v-row class="ma-0" >
            <v-col cols="3" >
                    <!--<v-img  aspect-ratio="1"  src="@/assets/users.png" />-->
                <v-icon size="72" color="teal">person_pin</v-icon>
            </v-col>
            <v-col cols="9">
                <v-card-title class="subtitle-1 pl-0  pt-0"  v-t="'user.adminUserTitle'" ></v-card-title>
                <v-card-subtitle class="pl-0 pb-0" v-t="'user.adminUserDescription'"></v-card-subtitle>
            </v-col>
        </v-row>
        <v-btn color="teal" class="mb-n-10" bottom right absolute text ><v-icon>arrow_forward</v-icon></v-btn>
    </v-card>

</template>
<script>


    export default {
        name: 'adminUsersCard',
        data() {
            return {}
        },
        created() {
        }
    }
</script>


