<template>
<v-container  grid-list-lg>
  <v-slide-y-transition mode="out-in">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Automatic</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="location_on" name="zipcode" v-model="zipcode" label="Zip Code" type="number"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="getDataFromApi" color="primary">Calculate</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Manual Input</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="waves" name="temperature" v-model="temperature" label="Temperature" type="number"></v-text-field>
              <v-text-field prepend-icon="pool" name="humidity" v-model="humidity" label="Humidity" id="humidity" type="number"></v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card class="elevation-12">
          <v-card-text>
            <v-alert
              type="error"
              v-model="showError"
              dismissible
              transition="scale-transition">
              {{errorMessage}}
            </v-alert>
            <h2 class="output-heading">Output Temperature <v-icon>ac_unit</v-icon></h2>
            <h3 class="output-temp">{{ outputTemp }}F</h3>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-slide-y-transition>
</v-container>
</template>

<script>
export default {
  name: 'Calculator',
  data() {
    return {
      humidity: 0,
      temperature: 0,
      zipcode: '',
      showError: false,
      errorMessage: 'Something went wrong, please try again or enter temperature and humidity manually.'
    };
  },
  computed: {
    outputTemp() {
      const maxDecrease = this.numOrZero(this.temperature) * .33;
      const effeciencyLoss = this.numOrZero(this.humidity) * 1.5;
      const actualDecrease = maxDecrease - (maxDecrease * (effeciencyLoss / 100));
      const output = Math.ceil(this.temperature - actualDecrease);

      return output <= 0 ? '--' : output;
    }
  },
  methods: {
    numOrZero (num) {
      return !isNaN(num) ? num : 0;
    },
    showErrorMessage() {

    },
    getDataFromApi() {
      const that = this;
      const zip = this.zipcode;
      fetch('https://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&appid=b1f23236fdf1d2e5dbbcadbdaad4a41e')
      .then(
        function(response) {
          if (response.status !== 200) {
            that.showError = true;
            return;
          }

          response.json().then(function(data) {
            that.temperature = Math.ceil((data.main.temp * (9/5)) - 459.67);
            that.humidity = data.main.humidity;
          });
        }
      )
      .catch(function(err) {
        that.showError = true;
        return;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3.output-temp {
  font-size:28px;
  text-align:center;
}
</style>
