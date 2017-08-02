module.exports = {
  handleFailure: function(error) {
    console.log('❌ error during api invocation:', error);
    const prompt = 'Sorry, we encountered a problem. Please, try again.';
    console.log('❌ prompt due to api invocation:', prompt);
    const cb = function(res) {
      res.say(prompt).shouldEndSession(true).send();
    };
    return new Promise((resolve) => {
      resolve({
        prompt,
        cb
      });
    });
  }
};