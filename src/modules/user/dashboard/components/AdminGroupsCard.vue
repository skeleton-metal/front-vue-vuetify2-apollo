<template>
    <v-card :to="{name:'groupsAdmin'}">
        <v-row class="ma-0" >
            <v-col cols="3" >
<!--                    <v-img  aspect-ratio="1"  src="@/assets/groups.jpg" />-->
                <v-icon size="72" color="indigo">supervised_user_circle</v-icon>
            </v-col>
            <v-col cols="9">
                <v-card-title class="subtitle-1 pl-0  pt-0"  v-t="'user.adminGroupTitle'" ></v-card-title>
                <v-card-subtitle class="pl-0 pb-0" v-t="'user.adminGroupDescription'"></v-card-subtitle>
            </v-col>
        </v-row>
        <v-btn color="indigo" class="mb-n-10" bottom right absolute text ><v-icon>arrow_forward</v-icon></v-btn>
    </v-card>

</template>
<script>


    export default {
        name: 'adminGroupsCard',
        data() {
            return {}
        },
        created() {
        }
    }
</script>
