export default class WeatherApi {
  appId = 'b1f23236fdf1d2e5dbbcadbdaad4a41e';
  baseUrl = 'https://api.openweathermap.org/data/2.5/';
  data = {};
  isZip = false;
  lat = null;
  lon = null;
  zipcode = '';


  constructor(lat, lon, zipcode) {
    this.lat = lat;
    this.lon = lon;
    this.zipcode = zipcode;
  }

  formatOneCall() {
    const {
      current,
      daily,
    } = this.data;

    let data = [
      {
        time: 'Current',
        temperature: Math.ceil((current.temp * (9 / 5)) - 459.67),
        humidity: current.humidity,
      },
    ];

    daily.forEach((item) => {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const date = new Date(item.dt * 1000);
      const dateString = date.toLocaleDateString('en-US', options);
      data.push({
        time: dateString,
        temperature: Math.ceil((item.temp.day * (9 / 5)) - 459.67),
        humidity: item.humidity,
      });
    });

    return data;
  }

  formatWeather() {
    const {
      main,
    } = this.data;
    return [
      {
        time: 'Current',
        temperature: Math.ceil((main.temp * (9 / 5)) - 459.67),
        humidity: main.humidity,
      },
    ];
  }

  get(onSuccess, onFailure) {
    const url = this.url();

    if (url === false) {
      onFailure(null);
      return;
    }

    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            this.data = data;
            const formatted = this.isZip ? this.formatWeather() : this.formatOneCall();
            onSuccess(formatted);
          });
        } else {
          onFailure(null);
        }
      })
      .catch(() => {
        onFailure('Please check your internet connection.');
      });
  }

  url() {
    this.isZip = false;

    if (this.zipcode.length === 5) {
      this.isZip = true;
      return `${this.baseUrl}weather?appid=${this.appId}&zip=${this.zipcode}`;
    }

    if (this.lat && this.lon) {
      return `${this.baseUrl}onecall?appid=${this.appId}&lat=${this.lat}&lon=${this.lon}`;
    }

    return false;
  }
}
