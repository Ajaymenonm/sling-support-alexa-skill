'use strict';

module.change_code = 1;

const slingskillconfig = require('./slingskillconfig.json');
const Alexa = require('alexa-app');
const app = new Alexa.app(slingskillconfig.alexa_app_name);

const GetUserDetailModule = require('./lib/GetUserDetailModule.js');

// Launch Intent
app.launch(function(req, res) {
  var prompt = 'Hello. Welcome to Sling Support';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});


//--------------------------Custom Intents---------------------------------//

app.intent('getUserDetailIntent', {
    'slots': {
      'DetailType': 'DetailTypeSlot'
    }
  },
  (req, res) => {
    return genericIntentModuleHandler(req, res, new GetUserDetailModule());
  }
);

//--------------------------Custom Intents---------------------------------//


// Generic Intent
const genericIntentModuleHandler = function(req, res, imodule) {

  var promise = imodule.intentResponse(req);
  return promise.then(function(results) {
    results.cb(res);
  })
};


module.exports = app;