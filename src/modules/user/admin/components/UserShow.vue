<template>
    <v-card>

        <v-toolbar flat dark color="primary">
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn icon dark @click="$emit('closeDialog')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-card-text>
            <v-alert v-if="errorMessage" type="error" dense text>{{errorMessage}}</v-alert>
        </v-card-text>

        <v-card-text>

            <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-list>
                        <v-list-item>
                            <v-list-item-icon class="mr-5">
                                <v-icon color="primary">account_box</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content class="mr-0">
                                <v-list-item-title>{{item.fullname}}</v-list-item-title>
                                <v-list-item-subtitle>Nombre y Apellido</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-icon class="mr-5">
                                <v-icon color="primary">credit_card</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content class="mr-0">
                                <v-list-item-title>{{item.dni}}</v-list-item-title>
                                <v-list-item-subtitle>DNI</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-icon class="mr-5">
                                <v-icon color="primary">attach_money</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content class="mr-0">
                                <v-list-item-title>{{item.amount}}</v-list-item-title>
                                <v-list-item-subtitle>Monto</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-icon class="mr-5">
                                <v-icon color="primary">account_circle</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content class="mr-0">
                                <v-list-item-title>{{item.createdBy.name}}</v-list-item-title>
                                <v-list-item-subtitle>Creado por</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item v-if="item.status == 'rechazado'">
                            <v-list-item-icon class="mr-5">
                                <v-icon color="error">report_problem</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content class="mr-0">
                                <v-list-item-title>{{item.status}}</v-list-item-title>
                                <v-list-item-subtitle>Estado</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                    </v-list>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                    <v-list>
                        <v-list-item>
                            <v-list-item-icon class="mr-5">
                                <v-icon color="primary">location_on</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content class="mr-0">
                                <v-list-item-title>{{item.locality}}</v-list-item-title>
                                <v-list-item-subtitle>Localidad</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-icon class="mr-5">
                                <v-icon color="primary">business</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content class="mr-0">
                                <v-list-item-title>{{item.address}}</v-list-item-title>
                                <v-list-item-subtitle>Direccion</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-icon class="mr-5">
                                <v-icon color="primary">group_work</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content class="mr-0">
                                <v-list-item-title>{{item.group.name}}</v-list-item-title>
                                <v-list-item-subtitle>Grupo</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-icon class="mr-5">
                                <v-icon color="primary">person_pin</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content class="mr-0">
                                <v-list-item-title>{{item.updatedBy.name}}</v-list-item-title>
                                <v-list-item-subtitle>Actualizado por</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item v-if="item.status == 'rechazado'">
                            <v-list-item-icon class="mr-5">
                                <v-icon color="error">note</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content class="mr-0">
                                <v-list-item-title>{{item.refuseComment}}</v-list-item-title>
                                <v-list-item-subtitle>Comentario de Rechazo</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                    </v-list>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                    <v-list>

                        <v-list-item>
                            <v-list-item-icon class="mr-5">
                                <v-icon color="primary">event</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content class="mr-0">
                                <v-list-item-title>{{getDate}}</v-list-item-title>
                                <v-list-item-subtitle>Fecha</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-icon class="mr-5">
                                <v-icon color="primary">watch_later</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content class="mr-0">
                                <v-list-item-title>{{item.since}} a {{item.until}}</v-list-item-title>
                                <v-list-item-subtitle>Hora</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-icon class="mr-5">
                                <v-icon color="primary">calendar_today</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content class="mr-0">
                                <v-list-item-title>{{item.month}}</v-list-item-title>
                                <v-list-item-subtitle>Mes</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-icon class="mr-5">
                                <v-icon color="primary">note</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content class="mr-0">
                                <v-list-item-title>{{item.comment}}</v-list-item-title>
                                <v-list-item-subtitle>Comentario</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>


                    </v-list>
                </v-col>

            </v-row>
        </v-card-text>


        <v-card-actions>
            <v-btn color="grey" tile outlined @click="$emit('closeDialog')">
                Cerrar
            </v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>

    </v-card>
</template>

<script>
    import {mapGetters} from 'vuex'
    //Relations
    import GroupProvider from "../providers/GroupProvider";

    //Handle Dates 
    //import moment from "moment";
    import moment from "moment-timezone";

    export default {
        name: "CovenantShow",
        props: {
            item: Object
        },
        data() {
            return {
                modal: false,
                title: "Detalles de cobranza",
                errorMessage: '',
                inputError: [],
                loading: false,
                groups: []
            }
        },
        created() {
            this.fetchGroups()
        },
        computed: {
            ...mapGetters([
                'me'
            ]),
            getDate(){
                return moment(parseInt(this.item.date)).tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD')
            }
        },
        methods: {


            fetchGroups() {
                this.loading = true
                GroupProvider.groups().then(r => {
                    this.groups = r.data.groups
                    this.loading = false
                })
            }

        },
    }
</script>

<style scoped>

</style>

