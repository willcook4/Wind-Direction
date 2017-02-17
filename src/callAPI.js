var request = require('request');
var apiId = process.env.OPENWEATHERMAPAPI;

module.exports = {
  getDegFromAPI_GET: function(location, callback) {
    var deg = 'an error occured';
    var speed = 'an error occured';
    var locationInput = JSON.stringify(location + ',uk');
    // console.log('location', location);
    var options = {
      url: 'http://api.openweathermap.org/data/2.5/find/?',
      method: 'GET',
      qs: {
        q: locationInput,
        units: 'metric',
        appId: apiId
      },
      json: true
    };

    request(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        // console.log('body', body);
        console.log('response', response);
        console.log('body', body);
        deg = body.list[0].wind.deg;
        speed = body.list[0].wind.speed;
          // console.log(typeof(deg));
      } else if (error){
        console.log('error', JSON.stringify(error));
        deg = 'error: ' + JSON.stringify(error);
      } else {
        deg = 'response: '+ JSON.stringify(response);
      }
      callback(deg, speed);
    });
  }
};