<template>

    <div v-if="mode === LOGO_MODE_SQUARE">
        <v-avatar tile size="60" color="grey lighten-2">
            <v-img v-if="src"  :src="src"/>
            <v-img v-else  src="@/assets/logo.png"/>
        </v-avatar>
    </div>

    <div v-else-if="mode === LOGO_MODE_ROUND">
        <v-avatar  size="60" color="grey lighten-2">
            <v-img v-if="src"  :src="src"/>
            <v-img v-else  src="@/assets/logo.png"/>
        </v-avatar>
    </div>

    <div v-else-if="mode === LOGO_MODE_RECTANGLE" class="grey lighten-2">
            <v-img  v-if="src" height="60" contain :src="src" />
            <v-img v-else height="60" contain src="@/assets/logo.png" />
    </div>

</template>
<script>
    import {LOGO_MODE_SQUARE, LOGO_MODE_ROUND, LOGO_MODE_RECTANGLE} from '../CustomizationConstants'

    export default {
        name: 'LogoView',
        props: {
            src: String,
            mode: String
        },
        created() {
            this.LOGO_MODE_SQUARE = LOGO_MODE_SQUARE
            this.LOGO_MODE_ROUND = LOGO_MODE_ROUND
            this.LOGO_MODE_RECTANGLE = LOGO_MODE_RECTANGLE
        }
    }
</script>
