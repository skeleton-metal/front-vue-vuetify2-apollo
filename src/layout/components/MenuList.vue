<template>
    <v-list dense class="pt-3">
        <template v-for="item in nav">

            <v-list-group
                    v-if="item.children && isGranted(item)"
                    :key="item.text"
            >

                <v-list-item slot="activator">
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item
                        v-for="child in item.children"
                        :key="child.text"
                        :to="child.link"
                        @click="$emit('closeDrawer')"
                >
                    <v-list-item-action v-if="child.icon">
                        <v-icon>{{ child.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ child.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>


            <v-list-item v-else-if="isGranted(item)" :key="item.text" :to="item.link" exact
                         @click="$emit('closeDrawer')">
                <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>
                        {{ item.text }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </template>
    </v-list>
</template>

<script>


    export default {
        name: "LayoutMenuList",
        props: {
            nav: {type: Array, default: null},
        },
        methods: {
            isGranted: function (item) {
                if (!item.groups) {
                    return true
                }
                return true
            },
        },
        computed: {
        }

    }
</script>

<style scoped>

</style>
