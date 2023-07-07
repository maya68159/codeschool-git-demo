const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation_probability,precipitation&daily=weathercode,temperature_2m_max&timezone=America%2FDenver";
Vue.createApp({
  data() {
    return {
      image: {
        backgroundImage:
          //   "url(https://code.mollyshewchuk.com/resources/weather/bg3.png)",
          "url(sunnny.jpg)",
      },
      weatherCode: "Clear Sky",
      highTemp: 101,
      lowTemp: 0,
      precipitation: "0%",
      forecastHigh: [],
      forecastCode: [],
      forecastIcons: [],
    };
  },
  methods: {
    pickIcon: function (codeList) {
      console.log(this.forecastCode);
      var weathercodeList = [];
      for (code of codeList) {
        if (code == 0) {
          weathercodeList.push("icofont-sunny");
        }
        if (code == 1 || code == 2 || code == 3) {
          weathercodeList.push("icofont-windy-sunny");
        }
        if (code == 45 || code == 48) {
          weathercodeList.push("icofont-windy-sunny");
        }
        if (code == 51 || code == 53 || code == 55) {
          weathercodeList.push("icofont-rainy-sunny");
        }
        if (code == 56 || code == 57) {
          weathercodeList.push("icofont-hail-rainy-sunny");
        }
        if (code == 61 || code == 63 || code == 65) {
          weathercodeList.push("icofont-hail-sunny");
        }
        if (code == 66 || code == 67) {
          weathercodeList.push("icofont-snowy-sunny-hail");
        }
        if (code == 71 || code == 73 || code == 75) {
          weathercodeList.push("icofont-snowy-sunny-rainy");
        }
        if (code == 77) {
          weathercodeList.push("icofont-snowy-sunny");
        }
        if (code == 80 || code == 81 || code == 82) {
          weathercodeList.push("icofont-snowy-thunder-sunny");
        }
        if (code == 85 || code == 86) {
          weathercodeList.push("icofont-hail-thunder-sunny");
        }
        if (code == 95 || code == 96 || code == 99) {
          weathercodeList.push("icofont-sun-alt");
        }
      }
      //   console.log(weathercodeList);
      this.forecastIcons = weathercodeList;
    },
    fetchFunction: function () {
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          var HIGH = 0;
          var LOW = 1000;
          for (temp of data.hourly.temperature_2m) {
            if (temp > HIGH) {
              HIGH = temp;
            }
            if (temp < LOW) {
              LOW = temp;
            }
          }
          PRECIP = 0;
          for (percent of data.hourly.precipitation_probability) {
            if (percent > PRECIP) {
              PRECIP = percent;
            }
          }
          this.precipitation = PRECIP + "%";
          this.highTemp = Math.floor((HIGH * 9) / 5 + 32);
          this.lowTemp = Math.floor((LOW * 9) / 5 + 32);
          this.forecastHigh = data.daily.temperature_2m_max;
          this.forecastCode = data.daily.weathercode;
          console.log(data.daily.weathercode);
          this.pickIcon(this.forecastCode);
        });
    },
  },
  created: function () {
    this.fetchFunction();
  },
}).mount("#app");
