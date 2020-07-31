<template>
<v-container grid-list-lg>
  <v-slide-y-transition mode="out-in">
    <v-layout row wrap>
      <weather-fetcher></weather-fetcher>
      <v-flex xs12>
        <v-card class="elevation-8">
          <v-card-text>
            <v-form>
              <v-layout v-if="showOptions">
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="6" class="px-2">
                    <v-select prepend-icon="date_range" label="Date" v-model="selected" :items="options" item-text="date" item-value="date"></v-select>
                  </v-col>
                  <v-col cols="12" xs="12" sm="6" class="px-2">
                    <v-select prepend-icon="schedule" label="Time" v-model="selectedTime" :items="timeOptions" item-text="time" item-value="time"></v-select>
                  </v-col>
                </v-row>
              </v-layout>
              <v-layout>
                <v-row no-gutters>
                  <v-col cols="12" xs="12" sm="6" class="px-2">
                    <v-text-field prepend-icon="wb_sunny" name="temperature" v-model="temperature" label="Temperature" type="number"></v-text-field>
                  </v-col>
                  <v-col cols="12" xs="12" sm="6" class="px-2">
                    <v-text-field prepend-icon="invert_colors" name="humidity" v-model="humidity" label="Humidity" id="humidity" type="number"></v-text-field>
                  </v-col>
                </v-row>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card class="elevation-8">
          <v-card-text>
            <h2 class="output-heading">Output Temperature</h2>
            <h3 class="output-temp"><v-icon color="blue lighten-3" left>ac_unit</v-icon> {{ outputTemp }}F</h3>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-slide-y-transition>
</v-container>
</template>

<script>
import WeatherFetcher from './WeatherFetcher.vue';

export default {
  name: 'Calculator',
  components: {
    WeatherFetcher,
  },
  data() {
    return {};
  },
  computed: {
    temperature: {
      get() {
        return this.$store.getters.selectedHour.temperature;
      },
      set(newTemp) {
        this.$store.commit('setTemp', newTemp);
      },
    },
    humidity: {
      get() {
        return this.$store.getters.selectedHour.humidity;
      },
      set(newHumidity) {
        this.$store.commit('setHumidity', newHumidity);
      },
    },
    options() {
      return this.$store.getters.data;
    },
    timeOptions() {
      return this.$store.getters.selectedDate.hours;
    },
    outputTemp() {
      const maxDecrease = this.numOrZero(this.temperature) * 0.33;
      const lossCoefficient = this.humidity > 50 ? 1.1 : 1.5;
      const effeciencyLoss = this.numOrZero(this.humidity) * lossCoefficient;
      const actualDecrease = maxDecrease - (maxDecrease * (effeciencyLoss / 100));
      const output = Math.ceil(this.temperature - actualDecrease);

      return output <= 0 ? '--' : output;
    },
    showOptions() {
      return this.options.length > 2;
    },
    selected: {
      get() {
        return this.$store.getters.selectedDate.date;
      },
      set(newDate) {
        this.$store.commit('setDate', newDate);
      }
    },
    selectedTime: {
      get() {
        return this.$store.getters.selectedHour.time;
      },
      set(newTime) {
        console.log(`'${newTime}'`);
        this.$store.dispatch('setHour', newTime);
      }
    }
  },
  methods: {
    numOrZero(num) {
      return !isNaN(num) ? num : 0;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2.output-heading {
  font-size:13px;
  color: #ccc;
}
h3.output-temp {
  font-size: 32px;
}
</style>
