<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="pa-3">
                ROLES AND PERMISSIONS
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import RoleProvider from "../provider/RoleProvider";

    export default {
        name: "RolePage",
        components: {},
        data(){
          return {
              permissions: []
          }
        },
        created() {
            RoleProvider.permissions().then(r => {
                console.log(r)
                this.permissions = r.data.permissions
            })
        }
    }
</script>

<style scoped>

</style>

