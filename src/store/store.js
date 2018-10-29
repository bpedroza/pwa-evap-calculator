import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    routeTransition: 'slide-over',
    weather: {
      temperature: 0,
      humidity: 0,
    },
  },
  getters: {
    temperature: state => state.weather.temperature,
    humidity: state => state.weather.humidity,
  },
  mutations: {
    setTemp(state, temp) {
      state.weather.temperature = temp;
    },
    setHumidity(state, humidity) {
      state.weather.humidity = humidity;
    },
  },
});
