import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import CustomizationProvider from '../modules/customization/providers/CustomizationProvider'
import store from './../store'

const colors = {
    primary: '#000000',
    secondary: '#ffffff',
    onPrimary: '#000000',
    onSecondary: '#ffffff',
}

const localCustom = JSON.parse(localStorage.getItem('custom'))

if (localCustom) {
    colors.primary = localCustom.colors.primary
    colors.onPrimary = localCustom.colors.onPrimary
    colors.secondary = localCustom.colors.secondary
    colors.onSecondary = localCustom.colors.onSecondary
}


Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.primary,
                secondary: colors.onPrimary,
                onPrimary: colors.secondary,
                onSecondary: colors.onSecondary,
            },
        },
        icons: {
            iconfont: 'md',
        }
    },
});

CustomizationProvider.customization().then(r => {

    localStorage.setItem('custom', JSON.stringify(r.data.customization))

    store.dispatch('setLogo',r.data.customization.logo)

    if (r.data.customization.colors.primary !== vuetify.framework.theme.themes.light.primary) {
        vuetify.framework.theme.themes.light.primary = r.data.customization.colors.primary
    }

    if (r.data.customization.colors.onPrimary !== vuetify.framework.theme.themes.light.onPrimary) {
        vuetify.framework.theme.themes.light.onPrimary = r.data.customization.colors.onPrimary
    }

    if (r.data.customization.colors.secondary !== vuetify.framework.theme.themes.light.secondary) {
        vuetify.framework.theme.themes.light.secondary = r.data.customization.colors.secondary
    }

    if (r.data.customization.colors.onSecondary !== vuetify.framework.theme.themes.light.onSecondary) {
        vuetify.framework.theme.themes.light.onSecondary = r.data.customization.colors.onSecondary
    }

})

export default vuetify
