#Wind Direction
###AMAZON ALEXA SKILL

####What does it do?
I built a skill (A skill is a voice controlled application for the Alexa platform) that requests from a user their location in the UK or a location they want information from. I take this request and forward it to the [Open Weather Map API](http://openweathermap.org/api/) to get the current weather data. With the response I interpret the wind speed and convert the wind direction degree into human format, e.g. 'Northery'.

A VUI of the skill would go like this...

User:
>"Alexa how windy is it in London"

Alexa:
>"It is blowing 3.45 miles per hour, in a Northerly direction in London"


####How does it work?
tbc


####What is Alexa?
Alexa is an intelligent personal assistant developed by Amazon. It is capable of voice interaction, music playback, controlling internet connected devices and interacting with other real time information. Most devices with Alexa allow users to activate the device using a wake-word.
_Simply - Talk to Alexa and it does something for you._


####Current Progress: _Alpha_
* ~~Working on Echosim(Amazon Echo simulator) with voice based commands and with Amazon Developer Console with text based commands.~~
* ~~Commit to GitHub.~~
* Add error handing for API interaction. e.g. API returns a list of places if one place is not found.
* Adding tests to check the api calls and functionality on a local Lambda
 environment.
* Add to the How does it work? in README.md.
* Looking at pushing it to the skills store. Getting cards, graphics etc ready.
* Need to refactor and clean code.
* Need to investigate why promises are being ignored when running in Lambda.
* Consider adding alternative languages and places (US Engligh, German). 

 
####Background
This project was built using the Amazon Alexa SDK for Node.js. I learn't about the SDK and using the Amazon Alexa environment including using Lambda (serverless cloud platform), DynamoDB(NO-SQL DB), IAM(Web Services Permissions) during a two day intro to Alexa event.


