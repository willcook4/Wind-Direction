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
        // console.log('body', body);
        // console.log('response', response);
        // console.log('body', body);
        deg = body.list[0].wind.deg;
        speed = body.list[0].wind.speed;
        console.log('api call sucessful:', response.statusCode);
          // console.log(typeof(deg));
        callback(deg, speed, errorMsg);
      } else if (error){
        // console.log('An error happen error', JSON.stringify(error));
        // deg = 'error: ' + JSON.stringify(error);
        console.log('An error happened, try again later ', response.statusCode);
        errorMsg = 'An error happened, try again later';
      } else {
        // deg = 'response: '+ JSON.stringify(response);
        errorMsg = 'Got an error response, try again later ' + response.statusCode;
        console.log('Error: ', response.statusCode);
        callback(deg, speed, errorMsg);
      }
    });
  }
};