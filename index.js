'use strict';

var methods = ['get', 'post', 'put'],
    request = require('request').defaults({
        json: true
    });

function Namely(options) {
    options = options || {};

    this.accessToken = options.accessToken;
    this.apiVersion  = options.apiVersion || 'v1';
    this.companyName = options.companyName;
    this.apiEndpoint = 'https://' + this.companyName + '.namely.com/api/' + this.apiVersion;
    this.hideSalary  = options.hideSalary || true;

    if (this.accessToken === undefined) {
        throw new Error('Namely must be initialized with an access token');
    }

    if (this.companyName === undefined) {
        throw new Error('Namely must be initialized with a company name');
    }
}

function send (method, path, opts, cb, resOpts) {
    request[method](path, opts, function (error, response, body) {
        if (error) {
            return cb(error);
        }

        if (resOpts.hideSalary) {
            if (body.profiles) {
                body.profiles.forEach(function (profile) {
                    delete profile.salary
                });
            }
        }

        cb(null, response, body);
    });
}

methods.forEach(function (method) {
    Namely.prototype[method] = function (path, opts, cb) {
        var resOpts = {
            hideSalary: this.hideSalary
        };

        if (typeof opts === 'function') {
            cb = opts;
            opts = {};
        }

        path = this.apiEndpoint + path + '.json';

        opts.headers = {
            authorization: 'Bearer ' + this.accessToken
        };

        return send(method, path, opts, cb, resOpts);
    };
});

Namely.prototype.profiles = function (opts, cb) {
    this.get('/profiles', opts, cb);
};

Namely.prototype.profile = function (id, opts, cb) {
    this.get('/profiles/' + id, opts, cb);
};

Namely.prototype.createProfile = function (opts, cb) {
    this.post('/profiles', opts, cb);
};

Namely.prototype.updateProfile = function (id, opts, cb) {
    this.put('/profiles/' + id, opts, cb);
};

Namely.prototype.me = function (opts, cb) {
    this.get('/profiles/me', opts, cb);
};

Namely.prototype.fields = function (opts, cb) {
    this.get('/profiles/fields', opts, cb);
};

Namely.prototype.createField = function (opts, cb) {
    this.post('/profiles/fields', opts, cb);
};

Namely.prototype.updateField = function (id, opts, cb) {
    this.put('/profiles/fields/' + id, opts, cb);
};

Namely.prototype.sections = function (opts, cb) {
    this.get('/profiles/fields/sections', opts, cb);
};

Namely.prototype.section = function (id, opts, cb) {
    this.get('/profiles/fields/sections/' + id, opts, cb);
};

Namely.prototype.createSection = function (opts, cb) {
    this.post('/profiles/fields/sections', opts, cb);
};

Namely.prototype.updateSection = function (id, opts, cb) {
    this.put('/profiles/fields/sections/' + id, opts, cb);
};

Namely.prototype.createFile = function (opts, cb) {
    this.post('/files', opts, cb);
};

Namely.prototype.events = function (opts, cb) {
    this.get('/events', opts, cb);
};

Namely.prototype.event = function (id, opts, cb) {
    this.get('/events/' + id, opts, cb);
};

Namely.prototype.createEvent = function (opts, cb) {
    this.post('/events', opts, cb);
};

Namely.prototype.updateEvent = function (id, opts, cb) {
    this.put('/events/' + id, opts, cb);
};

Namely.prototype.currencyTypes = function (opts, cb) {
    this.get('/currency_types', opts, cb);
};

Namely.prototype.countries = function (opts, cb) {
    this.get('/countries', opts, cb);
};

Namely.prototype.country = function (id, opts, cb) {
    this.get('/countries/' + id, opts, cb);
};

Namely.prototype.jobTitles = function (opts, cb) {
    this.get('/job_titles', opts, cb);
};

Namely.prototype.jobTitle = function (id, opts, cb) {
    this.get('/job_titles/' + id, opts, cb);
};

Namely.prototype.createJobTitle = function (opts, cb) {
    this.post('/job_titles', opts, cb);
};

Namely.prototype.updateJobTitle = function (id, opts, cb) {
    this.put('/job_titles/' + id, opts, cb);
};

Namely.prototype.jobTiers = function (opts, cb) {
    this.get('/job_tiers', opts, cb);
};

Namely.prototype.jobTier = function (id, opts, cb) {
    this.get('/job_tiers/' + id, opts, cb);
};

Namely.prototype.createJobTier = function (opts, cb) {
    this.post('/job_tiers', opts, cb);
};

Namely.prototype.updateJobTier = function (id, opts, cb) {
    this.put('/job_tiers/' + id, opts, cb);
};

module.exports = Namely;
