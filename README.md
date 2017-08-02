### Sling Support Alexa Skill

<hr />

#### Steps
* npm install
  Install the dependencies
* gulp createconfig
  A gulp task generates a json config file with the URL to the api service (see gulpfile.js).
* gulp deploy
  Creates a zip file in the dist directory, intended for upload to aws lambda.