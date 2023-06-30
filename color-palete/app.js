Vue.createApp({
  data() {
    return {
      rgbColor: {
        red: 0,
        green: 0,
        blue: 0,
      },
      rgbString: "rgb(0, 0, 0)",
      colorList: [],
      errorModule: false,
      errors: [],
    };
  },
  methods: {
    changeColor: function () {
      var colorObj = {
        red: this.rgbColor.red,
        green: this.rgbColor.green,
        blue: this.rgbColor.blue,
        code:
          "rgb(" +
          this.rgbColor.red +
          ", " +
          this.rgbColor.green +
          ", " +
          this.rgbColor.blue +
          ")",
      };

      // VALIDATE

      if (colorObj.red < 0 || colorObj.red > 255) {
        this.errors.push("Red color code must be between 0 and 255.");
      }
      if (colorObj.green < 0 || colorObj.green > 255) {
        this.errors.push("Green color code must be between 0 and 255.");
      }
      if (colorObj.blue < 0 || colorObj.blue > 255) {
        this.errors.push("Blue color code must be between 0 and 255.");
      }

      if (this.errors.length == 0) {
        this.rgbString = colorObj.code;
        this.colorList.push(colorObj);
      } else {
        this.errorModule = !this.errorModule;
      }
      this.rgbColor.red = 0;
      this.rgbColor.green = 0;
      this.rgbColor.blue = 0;
    },
    closeModule: function () {
      this.errorModule = !this.errorModule;
      this.errors = [];
    },
  },
  created: function () {},
}).mount("#app");
