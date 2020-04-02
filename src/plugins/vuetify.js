import Vue from 'vue';
import Vuetify from 'vuetify/lib';
//import CustomizationProvider from '../modules/customization/providers/CustomizationProvider'
import store from './../store'


Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
        //dark: true,
        themes: {
            light: {
                primary: store.getters.getColors.primary,
                secondary: store.getters.getColors.secondary,
                onPrimary: store.getters.getColors.onPrimary,
                onSecondary: store.getters.getColors.onSecondary
            },
        },
        icons: {
            iconfont: 'md',
        }
    },
});


export default vuetify
