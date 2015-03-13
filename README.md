[![Build Status](https://travis-ci.org/jonathanchrisp/namely.svg?branch=master)](https://travis-ci.org/jonathanchrisp/namely)
[![Coverage Status](https://coveralls.io/repos/jonathanchrisp/namely/badge.svg?branch=)](https://coveralls.io/r/jonathanchrisp/namely?branch=)
[![Code Climate](https://codeclimate.com/github/jonathanchrisp/namely/badges/gpa.svg)](https://codeclimate.com/github/jonathanchrisp/namely)

# namely
A npm package for the Namely API

## Getting Started
Create a new instance of Namely passing the required options:

```
var namelyApi = new Namely({
    accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
    companyName: 'companyName'
});
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
