### Sling Support Alexa Skill

<hr />

#### Steps
- `$ npm install` <br /> Install the dependencies <br />
<br />

- `$ gulp createconfig` <br /> A gulp task generates a json config file with the URL to the api service. See [gulpfile.js](gulpfile.js) <br />
<br />

- `$ gulp deploy` <br /> Creates a zip file in the dist directory, intended for upload to aws lambda.