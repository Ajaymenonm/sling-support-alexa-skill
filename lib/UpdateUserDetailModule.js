'use strict';
module.change_code = 1;

const APIFailureHandler = require('./APIFailureHandler');
const SlingAPIFactory = require('./SlingAPIFactory');
const slingAPIHelper = SlingAPIFactory.factory();

function UpdateUserDetailModule() {

  this.intentResponse = function(req) {
    var prompt, cb;
    var userdetailTypeSlot = req.slot('UserDetailType');
    var name = req.slot('FirstName');
    var number = req.slot('Number');

    if (!userdetailTypeSlot && !name && !number) {
      prompt = 'What user details would you like to update? You can update your name or phone number. Which one will it be?';
      cb = function(res) {
        res.say(prompt).shouldEndSession(false);
      };
      return new Promise(function(resolve) {
        resolve({
          prompt,
          cb
        });
      });
    } else if (!name && !number) {

      switch (userdetailTypeSlot.toLowerCase()) {
        case 'name':
          prompt = 'Okay. What will the new name be?';
          break;

        case 'number':
          prompt = 'Okay. What will the new number be?';
          break;

        default:
          prompt = 'I cannot do that yet! You can only update your name or phone number. Which one will it be?'
      }

      cb = function(res) {
        res.say(prompt).shouldEndSession(false);
      };
      return new Promise((resolve) => {
        resolve({
          prompt,
          cb
        });
      });
    }

    if (name) {
      console.log('a')
      prompt = 'You want to update your name to ' + name + '. Is that correct?';
      cb = function(res) {
        res.say(prompt).session('nameSession', name).session('intentName', 'updateUserDetailsIntent').shouldEndSession(false);
      };
    } else if (number) {
      console.log('b')
      prompt = 'You want to update your number to <say-as interpret-as="telephone">' + number + '</say-as>. Is that correct?';
      cb = function(res) {
        res.say(prompt).session('numberSession', number).session('intentName', 'updateUserDetailsIntent').shouldEndSession(false);
      };
    } else {
      console.log('e')
      prompt = 'I cannot help you with that. Please try from the beginning. What user details would you like to update? You can update your name or phone number. Which one will it be?';
      cb = function(res) {
        res.say(prompt).shouldEndSession(false);
      };
    }
    return new Promise((resolve) => {
      resolve({
        prompt,
        cb
      });
    });
  };

  this.updateDetails = function(name, number) {
    var prompt, cb;
    var p = slingAPIHelper.updateUserDetails(name, number);
    var handleSuccess = function(results) {
      if (!results) {
        prompt = 'Sorry, I couldn\'t update the details. Please try again later.';
        cb = function(response) {
          res.say(prompt).shouldEndSession(true);
        }
        return {
          prompt,
          cb
        };
      } else {
        if (name) {
          prompt = 'Your name has been updated successfully to ' + name;
        } else {
          prompt = 'Your phone number has been successfully updated to <say-as interpret-as="telephone">' + number + '</say-as>';
        }
        cb = function(res) {
          res.say(prompt).shouldEndSession(true);
        };
        return new Promise(function(resolve) {
          resolve({
            prompt,
            cb
          });
        });
      }
    };
    return p.then(handleSuccess).catch(APIFailureHandler.handleFailure);
  };

  this.yesIntentResponse = function(req) {
    var name = req.session('nameSession');
    var number = req.session('numberSession');
    return this.updateDetails(name, number);
  };

  this.noIntentResponse = function(req, res) {
    var name = res.session('nameSession');
    var number = res.session('numberSession');
    var prompt, cb;

    if (name) {
      prompt = 'Okay. Lets try again. What will the name be?';
      cb = function(res) {
        res.say(prompt).clearSession(true).shouldEndSession(false);
      };
    } else {
      prompt = 'Okay. Lets try again. What will the number be?';
      cb = function(res) {
        res.say(prompt).clearSession(true).shouldEndSession(false);
      };
    }
    return {
      prompt,
      cb
    };
  };
}

module.exports = UpdateUserDetailModule;