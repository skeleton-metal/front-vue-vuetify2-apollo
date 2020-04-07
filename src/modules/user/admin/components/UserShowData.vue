<template>
    <v-row>
        <v-col cols="12" sm="6" md="4">
            <v-list>
                <user-show-item :item="item.name" :label="$t('user.form.fullname')" icon="account_box"/>
                <user-show-item :item="item.username" :label="$t('user.form.username')" icon="account_circle"/>
            </v-list>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-list>
                <user-show-item :item="item.email" :label="$t('user.form.email')" icon="alternate_email"/>
                <user-show-item :item="item.phone" :label="$t('user.form.phone')" icon="phone"/>
            </v-list>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-list>
                <user-show-item :item="item.active?'Activo':'Inactivo'" :label="$t('user.form.active')"
                                :icon="item.active?'done':'clear'"/>
                <user-show-item :item="item.role.name" :label="$t('user.form.role')" icon="phone"/>
            </v-list>
        </v-col>

        <v-col cols="12" class="py-0">
            <v-row>
                <v-col cols="12" md="12" class="py-0">{{$t('user.form.groups')}}:</v-col>
                <v-col cols="12" md="12" class="py-0">
                    <v-chip-group class="text-left">
                        <v-chip v-for="group in item.groups" :key="group.id">
                            {{ group.name }}
                        </v-chip>
                    </v-chip-group>
                </v-col>
            </v-row>

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
