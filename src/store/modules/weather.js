export default {
  state: {
    data: [{
      date: 'Custom',
      hours: [{
        temperature: 0,
        humidity: 0,
        time: 'Now',
      }, ],
    }, ],
    selectedDate: 'Custom',
    selectedHour: 0,
  },
  getters: {
    data: (state) => state.data,
    selectedDate: (state) => state.data.find(el => el.date === state.selectedDate),
    selectedHour: (state, getters) => getters.selectedDate.hours[state.selectedHour],
  },
  actions: {
    setHour({ commit, getters }, hour) {
      hour = getters.selectedDate.hours.findIndex(el => el.time === hour);
      commit('setHour', hour);
    }
  },
  mutations: {
    setData(state, data) {
      const selected = data[0] || state.data[0];
      data.unshift(state.data[0]);
      state.data = data;
      state.selectedHour = 0;
      state.selectedDate = selected.date;
    },
    setDate(state, date) {
      state.selectedHour = 0;
      state.selectedDate = date;
    },
    setHour(state, hour) {
      state.selectedHour = hour;
    },
    setTemp(state, temp) {
      state.selectedDate = 'Custom';
      state.selectedHour = 0;
      state.data[0].hours[0].temperature = temp;
    },
    setHumidity(state, humidity) {
      state.selectedDate = 'Custom';
      state.selectedHour = 0;
      state.data[0].hours[0].humidity = humidity;
    },
  },
};
