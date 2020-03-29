import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import CustomizationProvider from '../modules/customization/providers/CustomizationProvider'

const colors = {
    primary: '#000000',
    secondary: '#ffffff',
    onPrimary: '#000000',
    onSecondary: '#ffffff',
}

const localCustom = JSON.parse(localStorage.getItem('custom'))

if (localCustom) {
    colors.primary = localCustom.primary
    colors.onPrimary = localCustom.onPrimary
    colors.secondary = localCustom.secondary
    colors.onSecondary = localCustom.onSecondary
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

    if (r.data.customization.primary !== vuetify.framework.theme.themes.light.primary) {
        vuetify.framework.theme.themes.light.primary = r.data.customization.primary
    }

    if (r.data.customization.onPrimary !== vuetify.framework.theme.themes.light.onPrimary) {
        vuetify.framework.theme.themes.light.onPrimary = r.data.customization.onPrimary
    }

    if (r.data.customization.secondary !== vuetify.framework.theme.themes.light.secondary) {
        vuetify.framework.theme.themes.light.secondary = r.data.customization.secondary
    }

    if (r.data.customization.onSecondary !== vuetify.framework.theme.themes.light.onSecondary) {
        vuetify.framework.theme.themes.light.onSecondary = r.data.customization.onSecondary
    }

})

export default vuetify
