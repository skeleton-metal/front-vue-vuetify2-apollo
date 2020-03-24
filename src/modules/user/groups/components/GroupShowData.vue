<template>
    <v-row>
        <v-col cols="12" sm="6" md="4">
            <v-list>
                 <group-show-item :item="item.name" label="Nombre" icon="account_box"/>
            </v-list>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-list>
                
            </v-list>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-list>
                
            </v-list>
        </v-col>

    </v-row>
</template>
<script>
    import GroupShowItem from "./GroupShowDataItem"

    export default {
        name: 'group-show-data',
        components: {GroupShowItem},
        props: {
            item: {}
        }
    }
</script>

