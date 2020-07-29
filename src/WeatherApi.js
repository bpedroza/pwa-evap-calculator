export default class WeatherApi {
  appId = 'b1f23236fdf1d2e5dbbcadbdaad4a41e';

  baseUrl = 'https://api.openweathermap.org/data/2.5/';

  data = {};

  dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  isZip = false;

  lat = null;

  lon = null;

  now = new Date();

  timeOptions = {
    hour: 'numeric',
    hour12: true,
  };

  zipcode = '';

  constructor(lat, lon, zipcode) {
    this.lat = lat;
    this.lon = lon;
    this.zipcode = zipcode;
  }

  formateDate(date) {
    return date.toLocaleDateString('en-US', this.dateOptions);
  }

  formateTime(date) {
    return date.toLocaleTimeString('en-US', this.timeOptions);
  }

  formatOneCall() {
    const {
      current,
      hourly,
    } = this.data;
    const data = {
      'Current': {
        date: 'Current',
        hours: [
          {
            time: 'Now',
            temperature: this.toFahrenheit(current.temp),
            humidity: current.humidity,
          }
        ],
      },
    };

    hourly.forEach((item) => {
      const date = new Date(item.dt * 1000);

      const dateString = this.formateDate(date);
      data[dateString] = data[dateString] || {
        date: dateString,
        hours: [],
      };
      data[dateString].hours.push({
        temperature: this.toFahrenheit(item.temp),
        humidity: item.humidity,
        time: this.formateTime(date),
      });
    });

    return Object.values(data);
  }

  formatWeather() {
    const {
      main,
    } = this.data;
    return [{
      date: 'Current',
      hours: [
        {
          time: 'Now',
          temperature: this.toFahrenheit(main.temp),
          humidity: main.humidity,
        },
      ],
    }, ];
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

  toFahrenheit(temp) {
    return Math.ceil((temp * (9 / 5)) - 459.67)
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
