export default {
  state: {
    data: [
      {
        time: 'Current',
        temperature: 0,
        humidity: 0,
      },
    ],
  },
  getters: {
    data: state => state.data,
    current: state => state.data[0],
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    },
    setTemp(state, temp) {
      state.data[0].temperature = temp;
    },
    setHumidity(state, humidity) {
      state.data[0].humidity = humidity;
    },
  },
};
