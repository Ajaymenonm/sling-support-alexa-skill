'use strict';

module.change_code = 1;

const slingskillconfig = require('./slingskillconfig.json');
const Alexa = require('alexa-app');
const app = new Alexa.app(slingskillconfig.alexa_app_name);

const GetUserDetailModule = require('./lib/GetUserDetailModule.js');
const UpdateUserDetailModule = require('./lib/UpdateUserDetailModule.js');

// Launch Intent
app.launch(function(req, res) {
  var prompt = 'Hello. Welcome to Sling Support';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});


//--------------------------Custom Intents---------------------------------//

// Get User Details
app.intent('getUserDetailIntent', {
    'slots': {
      'DetailType': 'DetailTypeSlot'
    }
  },
  (req, res) => {
    return genericIntentModuleHandler(req, res, new GetUserDetailModule());
  }
);


//Update User details
app.intent('updateUserDetailIntent', {
    'slots': {
      'UserDetailType': 'UserDetailTypeSlot',
      'FirstName': 'AMAZON.US_FIRST_NAME',
      'Number': 'AMAZON.NUMBER'
    }
  },
  (req, res) => {
    return genericIntentModuleHandler(req, res, new UpdateUserDetailModule());
  }
);

//--------------------------Custom Intents---------------------------------//


//--------------------------Amazon Built-In Intents-------------------------//

// AMAZON YES Intent
app.intent('AMAZON.YesIntent', function(req, res) {
  var promise = null;
  var precedingIntentName = res.session('intentName');
  const imodule = getImoduleByIntent(precedingIntentName);
  if (imodule) {
    promise = imodule.yesIntentResponse(req);
    return promise.then(function(intentResponse) {
      intentResponse.cb(res);
    });
  } else {
    var prompt = 'I am sorry, lets try from the beginning.';
    res.say(prompt).shouldEndSession(false);
  }
});


// AMAZON NO Intent
app.intent('AMAZON.NoIntent',
  function(req, res) {
    var intentResponse = {};
    var precedingIntentName = res.session('intentName');
    const imodule = getImoduleByIntent(precedingIntentName);
    if (imodule) {
      intentResponse = imodule.noIntentResponse(req, res);
    } else {
      var prompt = 'Okay. Thank You.';
      intentResponse = {
        prompt: prompt,
        cb: function() {
          res.say(prompt).shouldEndSession(true);
        }
      };
    }
    return intentResponse.cb(res);
  }
);


//--------------------------Amazon Built-In Intents-------------------------//


// Generic Intent
const genericIntentModuleHandler = function(req, res, imodule) {

  var promise = imodule.intentResponse(req);
  return promise.then(function(results) {
    results.cb(res);
  })
};


const getImoduleByIntent = function(intentName) {
  var imodule = null;
  if (intentName === 'updateUserDetailsIntent') {
    imodule = new UpdateUserDetailModule();
  }
  return imodule;
};


module.exports = app;