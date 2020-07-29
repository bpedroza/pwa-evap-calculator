export default {
  state: {
    data: [
      {
        date: 'Current',
        hours: [
          {
            temperature: 0,
            humidity: 0,
            time: 'Now',
          },
        ],
      },
    ],
  },
  getters: {
    data: (state) => state.data,
    current: (state) => state.data[0],
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    },
    setTemp(state, temp) {
      state.data[0].hours[0].temperature = temp;
    },
    setHumidity(state, humidity) {
      state.data[0].hours[0].humidity = humidity;
    },
  },
};
