<template>
<v-flex xs12>
  <v-snackbar color="warning" v-model="showError">
    {{errorMessage}}
  </v-snackbar>
  <v-card class="elevation-8">
    <v-card-text>
      <v-form @submit.prevent="requestLocation"  v-if="showZipCode">
        <v-text-field
        prepend-icon="location_on"
        name="zipcode"
        v-model="zipcode"
        label="Zip Code"
        type="number"></v-text-field>
      </v-form>
      <div v-if="!showZipCode">
      <v-icon left>location_on</v-icon> {{ coordinates }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="requestLocation" :loading="loading" :disabled="loading" color="primary" block>
        <v-icon left>cloud_download</v-icon>
        Get Weather Information
      </v-btn>
    </v-card-actions>
  </v-card>
</v-flex>
</template>

<script>
import { mapMutations } from 'vuex';
import WeatherApi from '../WeatherApi';

export default {
  data() {
    return {
      zipcode: '',
      showError: false,
      errorMessage: 'Something went wrong, please try again or enter temperature and humidity manually.',
      lat: false,
      lon: false,
      loading: false,
      showZipCode: false,
    };
  },
  computed: {
    coordinates() {
      return this.lat ? `${this.lat}, ${this.lon}` : 'Click the button below to update your location and get weather details.';
    },
  },
  methods: {
    ...mapMutations(['setTemp', 'setHumidity']),
    requestLocation() {
      this.loading = true;
      if (navigator.geolocation) {
        this.handleLocation();
      } else {
        this.getDataFromApi();
      }
    },
    handleLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.getDataFromApi();
      }, () => {
        this.getDataFromApi();
      });
    },
    getDataFromApi() {
      const API = new WeatherApi(this.lat, this.lon, this.zipcode);
      API.get.bind(API)((data) => {
        this.$store.commit('setData', data);
        this.loading = false;
      }, (error) => {
        if (error === null) {
          this.showZipError();
        } else {
          this.errorMessage = error;
          this.showError = true;
        }
        this.loading = false;
      });
    },
    showZipError() {
      this.showZipCode = true;
      this.errorMessage = 'Enter a valid zipcode and try again.';
      this.showError = true;

      return this;
    },
  },
};
</script>
