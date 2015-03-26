'use strict';

var methods = ['get', 'post', 'put', 'delete'],
    request = require('request').defaults({
        json: true
    });

function Namely(options) {
    options = options || {};

    this.accessToken = options.accessToken;
    this.apiVersion  = options.apiVersion || 'v1';
    this.companyName = options.companyName;
    this.apiEndpoint = 'https://' + this.companyName + '.namely.com/api/' + this.apiVersion + '/';

    if (this.accessToken === undefined) {
        throw new Error('Namely must be initialized with an access token');
    }

    if (this.companyName === undefined) {
        throw new Error('Namely must be initialized with a company name');
    }
}

Namely.prototype.send = function (method, path, opts, cb) {
    path = this.apiEndpoint + path + '.json';

    if (typeof opts === 'function') {
        cb = opts;
        opts = {};
    }

    opts.headers = {
        authorization: 'Bearer ' + this.accessToken
    };

    request[method](path, opts, function (error, response, body) {
        if (error) {
            return cb(error);
        }

        cb(null, response, body);
    });
};

methods.forEach(function (method) {
    Namely.prototype[method] = function (path, opts, cb) {
        return this.send(method, path, opts, cb);
    };
});

Namely.prototype.profiles = function (opts, cb) {
    this.get('profiles', opts, cb);
};

module.exports = Namely;
