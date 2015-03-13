'use strict';

var request = require('request');

function Namely(options) {
    options = options || {};

    this.accessToken = options.accessToken;
    this.apiVersion  = options.apiVersion || 'v1';
    this.companyName = options.companyName;
    this.apiEndpoint = 'https://' + this.companyName + '.namely.com/api/' + this.apiVersion;

    if (this.accessToken === undefined) {
        throw new Error('Namely must be initialized with an access token');
    }

    if (this.companyName === undefined) {
        throw new Error('Namely must be initialized with a company name');
    }
}

Namely.prototype.send = function (path, opts, cb) {
    path = path + '.json';
    opts = opts || {};

    opts.headers = {
        authorization: 'Bearer ' + this.accessToken
    };

    opts.json = true;

    request(path, opts, function (error, response, body) {
        if (error) {
            return cb(error);
        }

        cb(null, response, body);
    });
};

Namely.prototype.profiles = function (opts, cb) {
    this.send(this.apiEndpoint + '/profiles', opts, cb);
};

module.exports = Namely;
