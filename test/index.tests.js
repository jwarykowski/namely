'use strict';

var proxyquire = require('proxyquire'),
    sinon      = require('sinon');

describe('index', function () {
    var namely,
        Namely,
        sandbox,
        stubs;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        stubs = {
            request: sandbox.stub()
        };

        Namely = proxyquire('..', stubs);
    });

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

        describe('with no options', function () {
            it('throws an error', function () {
                expect(function () {
                    new Namely();
                }).toThrow('Namely must be initialized with an access token');
            });
        });
    });

    describe('profiles', function () {
        var profileSpy,
            sendStub;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            profileSpy = sandbox.spy(namely, 'profiles');
            sendStub   = sandbox.stub(namely, 'send');
        });

        describe('with no options', function () {
            beforeEach(function () {
                namely.profiles();
            });

            it('it calls profiles and passes the correct arguments', function () {
                expect(profileSpy.calledOnce).toEqual(true);
                expect(profileSpy.args[0][0]).toEqual(undefined);
            });

            it('it calls send and passes the correct arguments', function () {
                expect(sendStub.calledOnce).toEqual(true);
                expect(sendStub.args[0][0]).toEqual('profiles');
                expect(sendStub.args[0][1]).toEqual(undefined);
                expect(sendStub.args[0][2]).toEqual(undefined);
            });
        });

        describe('with options', function () {
            beforeEach(function () {
                namely.profiles({
                    limit: 100,
                    after: '12345678790'
                });
            });

            it('it calls send and passes the correct arguments', function () {
                expect(profileSpy.calledOnce).toEqual(true);
                expect(profileSpy.args[0][0]).toEqual({limit: 100, after: '12345678790'});
            });

            it('it calls send and passes the correct arguments', function () {
                expect(sendStub.calledOnce).toEqual(true);
                expect(sendStub.args[0][0]).toEqual('profiles');
                expect(sendStub.args[0][1]).toEqual({limit: 100, after: '12345678790'});
                expect(sendStub.args[0][2]).toEqual(undefined);
            });
        });
    });

    describe('send', function () {
        var sendSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            sendSpy = sandbox.spy(namely, 'send');

            namely.profiles();
        });

        it('sets authorization access token in headers before sending request', function () {
            expect(sendSpy.calledOnce).toEqual(true);
            expect(typeof(stubs.request.args[0][1])).toEqual('object');
            expect(typeof(stubs.request.args[0][1].headers)).toEqual('object');
            expect(stubs.request.args[0][1].headers.authorization).toEqual('Bearer UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT');
        });

        it('appends .json to the url path before sending request', function () {
            expect(sendSpy.calledOnce).toEqual(true);
            expect(typeof(stubs.request.args[0][1])).toEqual('object');
            expect(stubs.request.args[0][1].json).toEqual(true);
        });

        it('calls request passing correct arguments', function () {
            expect(stubs.request.calledOnce).toEqual(true);
            expect(stubs.request.args[0][0]).toEqual('https://companyName.namely.com/api/v1/profiles.json');
            expect(stubs.request.args[0][1]).toEqual({
                headers: {
                    authorization: 'Bearer UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                },
                json: true
            });
            expect(typeof(stubs.request.args[0][2])).toEqual('function');
        });

        describe('callback', function () {
            var callbackSpy;

            beforeEach(function () {
                callbackSpy = sandbox.spy();
            });

            describe('error', function () {
                beforeEach(function () {
                    stubs = {
                        request: sandbox.stub().yields('Fake Error', {}, {})
                    };

                    Namely = proxyquire('..', stubs);

                    namely = new Namely({
                        accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                        companyName: 'companyName'
                    });
                });

                it('calls callback with error if error returned', function () {
                    namely.profiles({}, callbackSpy);
                    expect(callbackSpy.calledOnce).toEqual(true);
                    expect(callbackSpy.calledWith('Fake Error')).toEqual(true);
                });
            });

            describe('no error', function () {
                beforeEach(function () {
                    stubs = {
                        request: sandbox.stub().yields(null, {
                            a: '1',
                            b: '2',
                            c: '3'
                        }, {
                            d: '4',
                            e: '5',
                            f: '6'
                        })
                    };

                    Namely = proxyquire('..', stubs);

                    namely = new Namely({
                        accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                        companyName: 'companyName'
                    });
                });

                it('calls callback with error if error returned', function () {
                    namely.profiles({}, callbackSpy);

                    expect(callbackSpy.calledOnce).toEqual(true);
                    expect(callbackSpy.calledWith(null, {
                        a: '1',
                        b: '2',
                        c: '3'
                    }, {
                        d: '4',
                        e: '5',
                        f: '6'
                    })).toEqual(true);
                });
            });
        });
    });
});
