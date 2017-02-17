var Alexa = require('alexa-sdk');
// var rp = require('request-promise');
var callAPI = require('./callAPI');

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
  // alexa.appId = 'amzn1.ask.skill.e1144999-5ad4-4887-b072-07d79d79697c';
  alexa.registerHandlers(handlers);
  alexa.execute();
};
// var self = this;

var handlers = {
  'LaunchRequest': function() {
    var say = 'Tell me the location you want wind info for';
    this.emit('sayIt', ':ask', say, 'Try again, I didn\'t get that');
  },

  'sayIt': function(responseType, speechOutput, reprompt) {
    this.emit(responseType, speechOutput, reprompt);
  },

  'UserLocationIntent': function(){
    // var yourLocation = this.event.request.intent.slots.userlocation.value;
    var yourLocation = 'London';

    callAPI.getDegFromAPI_GET(yourLocation, ((deg, speed, errorMsg) => {

      if (!errorMsg) {
        // API call was sucessful
        var degResponse = deg;
        var wordDirection = '';

        switch(true) {
          case (degResponse >= 348.76 || degResponse < 11.25): // North
            wordDirection = 'Northerly';
            break;
          case (degResponse >= 11.26 && degResponse < 33.75): // North North East
            wordDirection = 'North North East';
            break;
          case (degResponse >= 33.76 && degResponse < 56.25): // North East
            wordDirection = 'Nor Easterly';
            break;
          case (degResponse >= 56.26 && degResponse < 78.75): // East North East
            wordDirection = 'East North East';
            break;
          case (degResponse >= 78.26 && degResponse < 101.25): // East
            wordDirection = 'Easterly';
            break;
          case (degResponse >= 101.26 && degResponse < 123.75): // East South East
            wordDirection = 'East South East';
            break;
          case (degResponse >= 123.76 && degResponse < 146.25): // South East
            wordDirection = 'South Easterly';
            break;
          case (degResponse >= 146.26 && degResponse < 168.75): // South South East
            wordDirection = 'South South East';
            break;
          case (degResponse >= 168.76 && degResponse < 191.25): // South
            wordDirection = 'Southerly';
            break;
          case (degResponse >= 191.26 && degResponse < 213.75): // South South West
            wordDirection = 'South South West';
            break;
          case (degResponse >= 213.76 && degResponse < 236.25): // South West
            wordDirection = 'South Western';
            break;
          case (degResponse >= 236.26 && degResponse < 258.75): // West South West
            wordDirection = 'West South West';
            break;
          case (degResponse >= 258.76 && degResponse < 281.25): // West
            wordDirection = 'Westerly';
            break;
          case (degResponse >= 281.26 && degResponse < 303.75): // West North West
            wordDirection = 'West North West';
            break;
          case (degResponse >= 303.76 && degResponse < 326.25): // North West
            wordDirection = 'Norwesterly';
            break;
          case (degResponse >= 326.26 && degResponse < 348.75): // West North West
            wordDirection = 'West North West';
            break;
        }
        var speedinMPH = (parseFloat(speed) * 2.236936).toFixed(2);

        this.emit('sayIt', ':tell', 'It is blowing ' + speedinMPH + ' miles per hour, in a ' + wordDirection + ' direction in ' + yourLocation);
      } else {
        // An error happened with the api call
        this.emit('sayIt', ':tell', errorMsg);
      }
    }));
  }
};
