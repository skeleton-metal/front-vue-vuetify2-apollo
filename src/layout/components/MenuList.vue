<template>
    <v-list dense class="pt-3">
        <template v-for="item in nav">

            <v-list-group
                    v-if="item.children && isGranted(item)"
                    :key="item.text"
            >

                <v-list-tile slot="activator">
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ item.text }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile
                        v-for="child in item.children"
                        :key="child.text"
                        :to="child.link"
                        @click="$emit('closeDrawer')"
                >
                    <v-list-tile-action v-if="child.icon">
                        <v-icon>{{ child.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ child.text }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list-group>


            <v-list-tile v-else-if="isGranted(item)" :key="item.text" :to="item.link" exact
                         @click="$emit('closeDrawer')">
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>
                        {{ item.text }}
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
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
