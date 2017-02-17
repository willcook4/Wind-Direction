var request = require('request');
var apiId = process.env.OPENWEATHERMAPAPI;

module.exports = {
  getDegFromAPI_GET: function(location, callback) {
    var errorMsg = '';
    var deg = 'an error occured';
    var speed = 'an error occured';
    var locationInput = location + JSON.stringify(',uk');
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
        deg = body.list[0].wind.deg;
        speed = body.list[0].wind.speed;
        console.log(response.statusCode + ' : API call sucessful: '+ deg + ', ' + speed + ', ' + location);
          // console.log(typeof(deg)); // Should be number
        callback(deg, speed, errorMsg);

      } else if (error || response.statusCode !== 200) {
        errorMsg = error + 'An error happened, try again later...';
        console.log('An API error', response.statusCode + error);
        callback(deg, speed, errorMsg);
      }
      //
      // } else if (error) {
      //
      //   // deg = 'response: '+ JSON.stringify(response); // Too long for Alexa
      //   errorMsg = 'Got an error response, try again later ' + error;
      //   console.log('Error: ', response.statusCode);
      //
    });
  }
};
