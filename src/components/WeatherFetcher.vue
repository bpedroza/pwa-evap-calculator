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
      const that = this;
      const url = this.getUrl();

      if (url === false) {
        this.loading = false;
        this.showZipError();
        return;
      }

      fetch(url)
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              that.setTemp(Math.ceil((data.main.temp * (9 / 5)) - 459.67));
              that.setHumidity(data.main.humidity);
            });
          } else {
            that.showZipError();
          }

          that.loading = false;
        })
        .catch(() => {
          that.errorMessage = 'Please check your internet connection.';
          that.showError = true;
          that.loading = false;
        });
    },
    getUrl() {
      const url = 'https://api.openweathermap.org/data/2.5/weather?appid=b1f23236fdf1d2e5dbbcadbdaad4a41e&';

      if (this.zipcode.length === 5) {
        return `${url}zip=${this.zipcode}`;
      }

      if (this.lat && this.lon) {
        this.showZipCode = false;
        return `${url}lat=${this.lat}&lon=${this.lon}`;
      }

      this.showZipError();
      return false;
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
