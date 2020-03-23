<template>
    <v-row>
        <v-col cols="12" sm="6" md="4">
            <v-list>
                <user-show-item :item="item.name" label="Nombre y Apellido" icon="account_box"/>
                <user-show-item :item="item.username" label="Usuario" icon="account_circle"/>
            </v-list>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-list>
                <user-show-item :item="item.email" label="Email" icon="alternate_email"/>
                <user-show-item :item="item.phone" label="Telefono" icon="phone"/>
            </v-list>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-list>
                <user-show-item :item="item.active?'Activo':'Inactivo'" label="Estado"
                                :icon="item.active?'done':'clear'"/>
            </v-list>
        </v-col>

    </v-row>
</template>
<script>
    import UserShowItem from "./UserShowItem"

    export default {
        name: 'user-show-data',
        components: {UserShowItem},
        props: {
            item: {}
        }
    }
</script>