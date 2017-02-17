var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
  // alexa.appId = "app id goes here";
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {

  'LaunchRequest': function() {
    var myName = this.event.request.intent.slots.myName.value;
    var say = "";

    if (myName === null) {
      // We don't have their name... get their name
      var welcome = "Welcome! What is your name?";
      this.emit(':ask', welcome, "try again, You can tell me your name, for example, you can say my name is Alexa.");
    } else {
      this.attributes['myName'] = myName;
      sayName = 'Hi ' + myName + '!';
      this.emit(':tell', sayName);
    }
    // var myName = this.event.request.intent.slots.myName.value;

      //
      // if (myName == null) { // no slot
      //     say = 'You can tell me your name, for example, you can say my name is Emma.';
      // } else {
      //     // create and store session attributes
      //     this.attributes['myName'] = myName;
      //     say = 'Hi ' + myName + '!';
      // }
      //
      // this.emit(':ask', say, 'try again');
  }
  //
  'MyNameIsIntent': function() {
  //     var myName = this.event.request.intent.slots.myName.value;
  //     var say = "";
  //
  //     if (myName == null) { // no slot
  //         say = 'You can tell me your name, for example, you can say my name is Emma.';
  //     } else {
  //         // create and store session attributes
  //         this.attributes['myName'] = myName;
  //         say = 'Hi ' + myName + '!';
  //     }
  //     this.emit(':ask', say, 'try again');
    this.emit(':tell', "my name is handler");
  },
  //
  'UserLocationIntent': function() {
  //   var userLocation = this.event.request.intent.slots.userLocation.value;
  //   var say = "";
  //
  //   if (userLocation = null) {
  //     // No location given...
  //     say = 'You can tell me your location, for example, you can say London.'
  //   } else {
  //     // Store the given location to the session attributes
  //     this.attributes['userLocation'] = userLocation;
  //     say = "I went to " + userLocation + " once!";
  //   }
  //   this.emit(':ask', say, 'wot');
    this.emit(':tell', "location handler");
  },
  'AMAZON.RepeatIntent': function() {
    this.emit(':tell', "recap goes here");
  },
  //
  'RecapIntent': function() {
  //   // create and store session attributes
  //   if (!this.attributes['myName']) {
  //       this.attributes['myName'] = [];  // empty array
  //   }
  //   var myName = this.attributes['myName'].toString();
  //
  //   if (!this.attributes['userlocation']) {
  //       this.attributes['userlocation'] = [];  // empty array
  //   }
  //   var userlocation = this.attributes['userlocation'].toString();
  //
  //
  //   this.emit(':tell', 'I have ' + myName + userlocation + " written down.");
    this.emit(':tell', "recap handler");
  },
  //
  'AMAZON.HelpIntent': function () {
  //     this.emit(':ask', 'Say the name of a British Place and get the wind direction.', 'try again');
    this.emit(':tell', 'help handler');
  },
  //
  'AMAZON.StopIntent': function () {
  //       var say = '';
  //       var myName = '';
  //       if (this.attributes['myName'] ) {
  //           myName = this.attributes['myName'];
  //       }
  //       say = 'Goodbye, ' + myName;
  //
  //       this.emit(':tell', say );
      this.emit(':tell', "stop handler");
  },
  'AMAZON.CancelIntent': function() {

    this.emit(':tell', "Cancel Intent handler");
  }
}
