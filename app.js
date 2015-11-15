(function () {
  'use strict';

  var axios = require('./node_modules/axios/dist/axios.min.js');
  var _ = require('./node_modules/lodash/index.js');

  var list = require('./const.js');

  var app = {
    init: function () {
      this.cacheElements();
      this.bindEvents();
      this.city = '';
    },

    cacheElements: function () {
      this.input = document.querySelector('.input_input');
      this.output = document.querySelector('.output');
      this.outputTemplate = _.template(document.querySelector('#outputTemplate').innerHTML);
    },

    bindEvents: function () {
      this.input.addEventListener('keyup', this.enterCity.bind(this), false);
    },

    enterCity: function () {
      var city = this.input.value;
      if (list.city[city] === undefined || this.city === city) {
        return;
      }
      this.city = city;
      this.getWeather();
    },

    getWeather: function () {
      var _this = this;
      axios({
        url: 'http://weather.livedoor.com/forecast/webservice/json/v1?city=' + list.city[this.city],
        method: 'GET'
      }).then(function(res) {
        if (res.status === 200) {
          _this.render(res.data.forecasts);
        }
      }).catch(function(res) {
        console.log(res);
        _this.flush();
      });
    },

    render: function (data) {
      this.output.innerHTML = this.outputTemplate({data: data});
    },

    flush: function () {
      this.output.innerHTML = '';
    }

  }; //app END.
  app.init();

})();
