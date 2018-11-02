export default {
  state: {
    temperature: 0,
    humidity: 0,
  },
  getters: {
    temperature: state => state.temperature,
    humidity: state => state.humidity,
  },
  mutations: {
    setTemp(state, temp) {
      state.temperature = temp;
    },
    setHumidity(state, humidity) {
      state.humidity = humidity;
    },
  },
};
