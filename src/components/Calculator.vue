<template>
<v-container grid-list-lg>
  <v-slide-y-transition mode="out-in">
    <v-layout row wrap>
      <weather-fetcher></weather-fetcher>
      <v-flex xs12>
        <v-card class="elevation-8">
          <v-card-text>
            <v-form>
              <v-select v-model="selected" v-if="showOptions" :items="options" item-text="time"></v-select>
              <v-text-field prepend-icon="wb_sunny" name="temperature" v-model="temperature" label="Temperature" type="number"></v-text-field>
              <v-text-field prepend-icon="invert_colors" name="humidity" v-model="humidity" label="Humidity" id="humidity" type="number"></v-text-field>
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
    return {
      selected: 'Current',
    };
  },
  computed: {
    temperature: {
      get() {
        const vm = this;
        return this.$store.getters.data.find((el) => {
          return el.time === vm.selected;
      }).temperature;
      },
      set(newTemp) {
        this.selected = 'Current';
        this.$store.commit('setTemp', newTemp);
      }
    },
    humidity: {
      get() {
        const vm = this;
        return this.$store.getters.data.find((el) => {
            return el.time === vm.selected;
        }).humidity;
      },
      set(newHumidity) {
        this.selected = 'Current';
        this.$store.commit('setHumidity', newHumidity);
      }
    },
    options() {
      return this.$store.getters.data;
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
      return Object.keys(this.$store.getters.data).length > 1;
    },
  },
  methods: {
    numOrZero(num) {
      return !isNaN(num) ? num : 0;
    }
  }
}
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
