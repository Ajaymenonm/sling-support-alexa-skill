module.exports = {
  factory: function() {
    var slingAPIHelper = null;
    const SlingAPI = require('./SlingAPIModule');
    slingAPIHelper = new SlingAPI();
    return slingAPIHelper;
  }
};