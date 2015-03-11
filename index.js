'use strict';

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

module.exports = Namely;
