import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/lib/util/colors';

const opts = {
  icons: {
    iconfont: 'md',
  },
  theme: {
    themes: {
      light: {
        primary: colors.blue.lighten2,
      },
    },
  },
};

Vue.use(Vuetify);

export default new Vuetify(opts);
