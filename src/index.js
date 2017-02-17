var Alexa = require('alexa-sdk');
// var rp = require('request-promise');
var callAPI = require('./callAPI');

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
  alexa.appId = 'amzn1.ask.skill.e1144999-5ad4-4887-b072-07d79d79697c';
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
    var yourLocation = this.event.request.intent.slots.userlocation.value;
    // var yourLocation = "london";
    // yourLocation = JSON.stringify(yourLocation);

    callAPI.getDegFromAPI_GET(yourLocation, ((deg, speed) =>{
      var degResponse = deg;
      var say = deg;

      switch(true) {
        case (degResponse >= 348.76 || degResponse < 11.25): // North
          say = 'Northerly';
          // console.log('North');
          break;
        case (degResponse >= 11.26 && degResponse < 33.75): // North North East
          say = 'North North East';
          // console.log('North North East');
          break;
        case (degResponse >= 33.76 && degResponse < 56.25): // North East
          say = 'Nor Easterly';
          // console.log('North East');
          break;
        case (degResponse >= 56.26 && degResponse < 78.75): // East North East
          say = 'East North East';
          // console.log('East North East');
          break;
        case (degResponse >= 78.26 && degResponse < 101.25): // East
          say = 'Easterly';
          // console.log('East');
          break;
        case (degResponse >= 101.26 && degResponse < 123.75): // East South East
          say = 'East South East';
          // console.log('East South East');
          break;
        case (degResponse >= 123.76 && degResponse < 146.25): // South East
          say = 'South Easterly';
          // console.log('South East');
          break;
        case (degResponse >= 146.26 && degResponse < 168.75): // South South East
          say = 'South South East';
          // console.log('South South East');
          break;
        case (degResponse >= 168.76 && degResponse < 191.25): // South
          say = 'Southerly';
          // console.log('South');
          break;
        case (degResponse >= 191.26 && degResponse < 213.75): // South South West
          say = 'South South West';
          // console.log('South South West');
          break;
        case (degResponse >= 213.76 && degResponse < 236.25): // South West
          say = 'South Western';
          // console.log('South West');
          break;
        case (degResponse >= 236.26 && degResponse < 258.75): // West South West
          say = 'West South West';
          // console.log('West South West');
          break;
        case (degResponse >= 258.76 && degResponse < 281.25): // West
          say = 'Westerly';
          // console.log('West');
          break;
        case (degResponse >= 281.26 && degResponse < 303.75): // West North West
          say = 'West North West';
          // console.log('West North West');
          break;
        case (degResponse >= 303.76 && degResponse < 326.25): // North West
          say = 'Norwesterly';
          // console.log('North West');
          break;
        case (degResponse >= 326.26 && degResponse < 348.75): // West North West
          say = 'West North West';
          // console.log('West North West');
          break;
      }
      var speedinMPH = parseFloat((parseFloat(speed)) * 2.236936).toFixed(2);

      this.emit('sayIt', ':tell', 'It is blowing ' + speedinMPH + ' miles per hour, in a ' + say + ' direction in ' + yourLocation);
    }));
  }
};

  /*
  Tried with Promises.... didn't play nice with Amazon Lambda :(
  'UserLocationIntent': function() {
                    //this.event.request.intent.slots.firstname.value;
    var yourLocation = this.event.request.intent.slots.userlocation.value;
    // var yourLocation = "london";
    var say = "Response is: ";
    var appid = process.env.OPENWEATHERMAPAPI;
    var degResponse = '';

    if(yourLocation === null) {
      say = "Tell me the location you want wind info for";
    }
    else {
      //this.attributes['userLocation'] = yourLocation; // Session intent
      // say = "I went to " + yourLocation + " once";

      // API Call
      var options = {
            uri: 'http://api.openweathermap.org/data/2.5/find',
            qs: {
                  "q": yourLocation + ',uk',
                  "appid": appid,
                  "units": 'metric'
            },
            headers: {
              'User-Agent': 'Request-Promise'
            },
            json: true
      };

      // degResponse = 20;

      rp(options).then(function(res) {
        // console.log('Response from api', res);
        // var degResponse = res.list[0].wind.deg;
        degResponse = 20;

        // switch(true) {
        //   case (degResponse >= 348.76 || degResponse < 11.25): // North
        //     say = "North";
        //     // console.log("North");
        //     break;
        //   case (degResponse >= 11.26 && degResponse < 33.75): // North North East
        //     say = "North North East";
        //     // console.log("North North East");
        //     break;
        //   case (degResponse >= 33.76 && degResponse < 56.25): // North East
        //     say = "North East";
        //     // console.log("North East");
        //     break;
        //   case (degResponse >= 56.26 && degResponse < 78.75): // East North East
        //     say = "East North East";
        //     // console.log("East North East");
        //     break;
        //   case (degResponse >= 78.26 && degResponse < 101.25): // East
        //     say = "East";
        //     // console.log("East");
        //     break;
        //   case (degResponse >= 101.26 && degResponse < 123.75): // East South East
        //     say = "East South East";
        //     // console.log("East South East");
        //     break;
        //   case (degResponse >= 123.76 && degResponse < 146.25): // South East
        //     say = "South East";
        //     // console.log("South East");
        //     break;
        //   case (degResponse >= 146.26 && degResponse < 168.75): // South South East
        //     say = "South South East";
        //     // console.log("South South East");
        //     break;
        //   case (degResponse >= 168.76 && degResponse < 191.25): // South
        //     say = "South";
        //     // console.log("South");
        //     break;
        //   case (degResponse >= 191.26 && degResponse < 213.75): // South South West
        //     say = "South South West";
        //     // console.log("South South West");
        //     break;
        //   case (degResponse >= 213.76 && degResponse < 236.25): // South West
        //     say = "South West";
        //     // console.log("South West");
        //     break;
        //   case (degResponse >= 236.26 && degResponse < 258.75): // West South West
        //     say = "West South West";
        //     // console.log("West South West");
        //     break;
        //   case (degResponse >= 258.76 && degResponse < 281.25): // West
        //     say = "West";
        //     // console.log("West");
        //     break;
        //   case (degResponse >= 281.26 && degResponse < 303.75): // West North West
        //     say = "West North West";
        //     // console.log("West North West");
        //     break;
        //   case (degResponse >= 303.76 && degResponse < 326.25): // North West
        //     say = "North West";
        //     // console.log("North West");
        //     break;
        //   case (degResponse >= 326.26 && degResponse < 348.75): // West North West
        //     say = "West North West";
        //     // console.log("West North West");
        //     break;
        // }
        // return say;
        say = say + degResponse;
        // this.emit.bind(this,'sayIt',':tell', say + degResponse);
        return say;
      })
      .catch(function(error){
        // console.log('An error happened', error);
        // self.emit('sayIt',':tell', say );
        say = 'An error happened';
        // this.emit.bind(this,'sayIt',':tell', say + degResponse);
        return say;
      })
      .finally(function(){
        this.emit('sayIt',':tell', say + degResponse);
      });
    }


  }
};
*/