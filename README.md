[![Build Status](https://travis-ci.org/jonathanchrisp/namely.svg?branch=master)](https://travis-ci.org/jonathanchrisp/namely)
[![Coverage Status](https://coveralls.io/repos/jonathanchrisp/namely/badge.svg?branch=)](https://coveralls.io/r/jonathanchrisp/namely?branch=)
[![Code Climate](https://codeclimate.com/github/jonathanchrisp/namely/badges/gpa.svg)](https://codeclimate.com/github/jonathanchrisp/namely)

# namely
A npm package for the Namely API

## Getting Started
Create a new instance of Namely passing the required options:

```
var Namely = require('Namely');

var namelyApi = new Namely({
    accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
    companyName: 'companyName'
});
```

## Using the client

Call `namelyApi.send(path, options, callback)` with the following parameters:
    @param {string} path The path of the api endpoint 
    @param {object} options The options to pass with your api call, structured per Namely's docs
    @param {function} callback A callback function. Will be sent the following params:
        @param {string} error An error
        @param {object} body The body of the request set
        @param {object} response The server response

```
//Post an event
namelyiApi.send('events', { "body": {"events": [{"content": "hello world}] }},
    function(error, body, response) {
        if (error) {
            console.log(error);
        } else {
            console.log(response);
        }
    }
);
```
## Testing

### Unit tests
To run all unit tests within the package run:

```
npm test
```

### Code Style / Lint Checks
To run jshint and jscs checks within the package run:

```
npm run lint
```
