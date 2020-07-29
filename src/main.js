import Vue from 'vue';
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import './registerServiceWorker';
import routes from './routes';
import store from './store/store';

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history',
});

new Vue({
  render: (h) => h(App),
  router,
  store,
  vuetify,
}).$mount('#app');
