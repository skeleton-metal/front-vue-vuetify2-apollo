<template>
    <v-list two-line>
        <v-list-item>
            <v-list-item-action>
                <v-icon color="secondary">account_box</v-icon>
            </v-list-item-action>

            <v-list-item-content>
                <v-list-item-subtitle class="secondary--text" v-t="'user.form.fullname'"></v-list-item-subtitle>
                <v-list-item-title> {{me.name}}</v-list-item-title>

            </v-list-item-content>
        </v-list-item>

        <v-list-item>
            <v-list-item-action>
                <v-icon color="secondary">mail</v-icon>
            </v-list-item-action>

            <v-list-item-content>
                <v-list-item-subtitle class="secondary--text" v-t="'user.form.email'"></v-list-item-subtitle>
                <v-list-item-title> {{me.email}}</v-list-item-title>

            </v-list-item-content>
        </v-list-item>

        <v-list-item>
            <v-list-item-action>
                <v-icon color="secondary">phone</v-icon>
            </v-list-item-action>

            <v-list-item-content>
                <v-list-item-subtitle class="secondary--text" v-t="'user.form.phone'"></v-list-item-subtitle>
                <v-list-item-title> {{me.phone}}</v-list-item-title>

            </v-list-item-content>


        </v-list-item>
    </v-list>
</template>

<script>
    export default {
        name: "ProfileView",
        props: {
            me: Object
        }
    }
</script>

<style scoped>

</style>
