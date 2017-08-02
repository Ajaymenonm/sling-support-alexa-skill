'use strict';
module.change_code = 1;

const APIFailureHandler = require('./APIFailureHandler');
const SlingAPIFactory = require('./SlingAPIFactory');
const slingAPIHelper = SlingAPIFactory.factory();

function GetUserDetailModule() {

  this.intentResponse = function(req) {
    var prompt, cb;
    var detailTypeSlot = req.slot('DetailType');

    if (!detailTypeSlot) {
      prompt = 'What user details would you like to know? You can ask for your name or phone number. Which one will it be?';
      cb = function(res) {
        res.say(prompt).shouldEndSession(false);
      };
      return new Promise(function(resolve) {
        resolve({
          prompt,
          cb
        });
      });
    } else {
      var p = slingAPIHelper.getUserDetails();
      var handleSuccess = function(results) {
        console.log('api response - ', JSON.stringify(results))
        if (!results) {
          prompt = 'Sorry! I couldn\'t find any user details.';
        } else {
          switch (detailTypeSlot.toLowerCase()) {
            case 'name':
              prompt = 'Your name is ' + results.name;
              break;

            case 'number':
              prompt = 'Your number is <say-as interpret-as="telephone">' + results.phone + '</say-as>.';
              break;
          }
        }
        cb = function(res) {
          res.say(prompt).shouldEndSession(true);
        };
        return new Promise((resolve) => {
          resolve({
            prompt,
            cb
          });
        });
      };
      return p.then(handleSuccess).catch(APIFailureHandler.handleFailure);
    }
  };
}

module.exports = GetUserDetailModule;