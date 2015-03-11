'use strict';

var Namely = require('..'),
    sinon  = require('sinon');

describe('index', function () {
    var sandbox = sinon.sandbox.create(),
        namely;

    afterEach(function () {
        sandbox.restore();
    });

    describe('new', function () {
        describe('with required options', function () {
            beforeEach(function () {
                namely = new Namely({
                    accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                    companyName: 'companyName'
                });
            });

            it('returns an object', function () {
                expect(namely).toBeDefined();
                expect(typeof(namely)).toEqual('object');
            });

            it('initialises the object with required options passed', function () {
                expect(namely.accessToken).toBeDefined();
                expect(namely.accessToken).toEqual('UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT');

                expect(namely.companyName).toBeDefined();
                expect(namely.companyName).toEqual('companyName');
            });

            it('initialises the object with all options passed', function () {
                expect(namely.accessToken).toBeDefined();
                expect(namely.accessToken).toEqual('UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT');

                expect(namely.companyName).toBeDefined();
                expect(namely.companyName).toEqual('companyName');
            });

            it('initialises options not passed with default values', function () {
                expect(namely.apiVersion).toBeDefined();
                expect(namely.apiVersion).toEqual('v1');
            });

            it('sets the appropriate api endpoint based off of options passed', function () {
                expect(namely.apiEndpoint).toBeDefined();
                expect(namely.apiEndpoint).toEqual('https://companyName.namely.com/api/v1');
            });
        });

        describe('with all options', function () {
            beforeEach(function () {
                namely = new Namely({
                    accessToken: '1abcdefghijklmnoqrstuvyxz2',
                    apiVersion: 'v2',
                    companyName: 'testing',
                });
            });

            it('returns an object', function () {
                expect(namely).toBeDefined();
                expect(typeof(namely)).toEqual('object');
            });

            it('initialises the object with all options passed', function () {
                expect(namely.accessToken).toBeDefined();
                expect(namely.accessToken).toEqual('1abcdefghijklmnoqrstuvyxz2');

                expect(namely.apiVersion).toBeDefined();
                expect(namely.apiVersion).toEqual('v2');

                expect(namely.companyName).toBeDefined();
                expect(namely.companyName).toEqual('testing');
            });

            it('sets the appropriate api endpoint based off of options passed', function () {
                expect(namely.apiEndpoint).toBeDefined();
                expect(namely.apiEndpoint).toEqual('https://testing.namely.com/api/v2');
            });
        });

        describe('with required options missing', function () {
            describe('missing accessToken', function () {
                it('throws an error', function () {
                    expect(function () {
                        new Namely({companyName: 'testing'});
                    }).toThrow('Namely must be initialized with an access token');
                });
            });

            describe('missing companyName', function () {
                it('throws an error', function () {
                    expect(function () {
                        new Namely({accessToken: '1abcdefghijklmnoqrstuvyxz2'});
                    }).toThrow('Namely must be initialized with a company name');
                });
            });
        });
    });
});
