'use strict';
module.change_code = 1;

const rp = require('request-promise');
const slingskillconfig = require('../slingskillconfig.json');
const guid = slingskillconfig.guid;

const GET_USER_DETAILS_ENDPOINT = slingskillconfig.api_scheme + '://' + slingskillconfig.api_host + '/sling-api/bravo/chatbot/user';
const UPDATE_USER_DETAILS_ENDPOINT = slingskillconfig.api_scheme + '://' + slingskillconfig.api_host + '/sling-api/bravo/chatbot/user/patch';

function SlingAPI() {}

SlingAPI.prototype.getUserDetails = function() {
  var options = {
    method: 'GET',
    uri: GET_USER_DETAILS_ENDPOINT,
    headers: {
      'Authorization': guid
    },
    json: true
  };
  console.log('API Request:', JSON.stringify(options));
  return rp(options);
};


SlingAPI.prototype.updateUserDetails = function(name, number) {
  var options = {
    method: 'POST',
    uri: UPDATE_USER_DETAILS_ENDPOINT,
    headers: {
      'Authorization': guid
    },
    body: {
      name: name,
      phone: number
    },
    json: true
  };
  console.log('API Request:', JSON.stringify(options));
  return rp(options);
};

module.exports = SlingAPI;