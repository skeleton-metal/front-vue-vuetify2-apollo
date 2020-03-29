import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#CA0909',
        secondary: '#b0bec5',
        onPrimary: '#8c9eff',
        onSecondary: '#b71c1c',
      },
    },
  icons: {
    iconfont: 'md',
    }
  },
});
