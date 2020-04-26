import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import store from './../store'

Vue.use(Vuetify);

let colors = {
    primary: '#000000',
    secondary: '#FFFFFF',
    onPrimary: '#000000',
    onSecondary: '#FFFFFF'
}

if(store && store.getters && store.getters.getColors){
    colors = {
        primary: store.getters.getColors.primary,
        secondary: store.getters.getColors.secondary,
        onPrimary: store.getters.getColors.onPrimary,
        onSecondary: store.getters.getColors.onSecondary
    }
}

const vuetify = new Vuetify({
    theme: {
        //dark: true,
        themes: {
            light: {
                primary: colors.primary,
                secondary: colors.secondary,
                onPrimary: colors.onPrimary,
                onSecondary: colors.onSecondary
            },
        },
        icons: {
            iconfont: 'md',
        }
    },
});


export default vuetify
