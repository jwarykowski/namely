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
            request: {
                get: sandbox.stub(),
                post: sandbox.stub(),
                put: sandbox.stub
            }
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
                expect(namely.apiEndpoint).toEqual('https://companyName.namely.com/api/v1/');
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
                expect(namely.apiEndpoint).toEqual('https://testing.namely.com/api/v2/');
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

        describe('instance methods', function () {
            it('creates get, post, and put methods', function (){
                expect(namely.get).toBeDefined();
                expect(namely.post).toBeDefined();
                expect(namely.put).toBeDefined();
            });

            it('has a send method', function () {
                expect(namely.send).toBeDefined();
            });

            it('has api methods', function() {
                expect(namely.profiles).toBeDefined();
            });
        });
    });

    describe('profiles', function () {
        var getStub,
            profileSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            getStub = sandbox.stub(namely, 'get');
            profileSpy = sandbox.spy(namely, 'profiles');
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
                expect(getStub.calledOnce).toEqual(true);
                expect(getStub.args[0][0]).toEqual('profiles');
                expect(getStub.args[0][1]).toEqual(undefined);
                expect(getStub.args[0][2]).toEqual(undefined);
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
                expect(getStub.calledOnce).toEqual(true);
                expect(getStub.args[0][0]).toEqual('profiles');
                expect(getStub.args[0][1]).toEqual({limit: 100, after: '12345678790'});
                expect(getStub.args[0][2]).toEqual(undefined);
            });
        });
    });

    describe('request methods', function () {
        describe('get, post, and put methods', function () {
            var sendStub;

            beforeEach(function () {
                namely = new Namely({
                    accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                    companyName: 'companyName'
                });

                sendStub = sandbox.stub(namely, 'send');
            });

            describe('get', function () {
                beforeEach(function () {
                    namely.get('profiles', {}, function () {});
                });

                it('passes the correct arguments to send method', function() {
                    expect(sendStub.called).toEqual(true);
                    expect(sendStub.args[0][0]).toEqual('get');
                    expect(sendStub.args[0][1]).toEqual('profiles');
                    expect(sendStub.args[0][2]).toEqual({});
                    expect(typeof(sendStub.args[0][3])).toEqual('function');
                });
            });

            describe('post', function () {
                beforeEach(function () {
                    namely.post('profiles', {}, function () {});
                });

                it('passes the correct arguments to send method', function() {
                    expect(sendStub.called).toEqual(true);
                    expect(sendStub.args[0][0]).toEqual('post');
                    expect(sendStub.args[0][1]).toEqual('profiles');
                    expect(sendStub.args[0][2]).toEqual({});
                    expect(typeof(sendStub.args[0][3])).toEqual('function');
                });
            });

            describe('put', function () {
                beforeEach(function () {
                    namely.put('profiles/1', {}, function () {});
                });

                it('passes the correct arguments to send method', function() {
                    expect(sendStub.called).toEqual(true);
                    expect(sendStub.args[0][0]).toEqual('put');
                    expect(sendStub.args[0][1]).toEqual('profiles/1');
                    expect(sendStub.args[0][2]).toEqual({});
                    expect(typeof(sendStub.args[0][3])).toEqual('function');
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

                namely.profiles({}, function () {});
            });

            it('sets authorization access token in headers before sending request', function () {
                expect(sendSpy.calledOnce).toEqual(true);

                expect(stubs.request.get.args[0][0]).toEqual('https://companyName.namely.com/api/v1/profiles.json');
                expect(typeof(stubs.request.get.args[0][1])).toEqual('object');
                expect(typeof(stubs.request.get.args[0][1].headers)).toEqual('object');
                expect(stubs.request.get.args[0][1].headers.authorization).
                    toEqual('Bearer UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT');
            });

            it('calls request method passing correct arguments', function () {
                expect(stubs.request.get.calledOnce).toEqual(true);
                expect(stubs.request.get.args[0][0]).toEqual('https://companyName.namely.com/api/v1/profiles.json');
                expect(typeof(stubs.request.get.args[0][1])).toEqual('object');
                expect(typeof(stubs.request.get.args[0][1].headers)).toEqual('object');
                expect(stubs.request.get.args[0][1].headers.authorization).
                    toEqual('Bearer UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT');
                expect(typeof(stubs.request.get.args[0][2])).toEqual('function');
            });

            describe('with no options', function () {
                before(function () {
                    namely.profiles(function () {});
                });

                it('sets the callback to be opts', function () {
                    expect(sendSpy.calledOnce).toEqual(true);
                    expect(stubs.request.get.args[0][0]).toEqual('https://companyName.namely.com/api/v1/profiles.json')
                    expect(typeof(stubs.request.get.args[0][1])).toEqual('object');
                    expect(typeof(stubs.request.get.args[0][1].headers)).toEqual('object');
                    expect(stubs.request.get.args[0][1].headers.authorization).
                        toEqual('Bearer UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT');
                    expect(typeof(stubs.request.get.args[0][2])).toEqual('function');
                });
            });

            describe('callback', function () {
                var callbackSpy;

                beforeEach(function () {
                    callbackSpy = sandbox.spy();
                });

                describe('error', function () {
                    beforeEach(function () {
                        stubs = {
                            request: {
                                get: sandbox.stub().yields('Fake Error', {}, {})
                            }
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
                            request: {
                                get: sandbox.stub().yields(null, {
                                    a: '1',
                                    b: '2',
                                    c: '3'
                                }, {
                                    d: '4',
                                    e: '5',
                                    f: '6'
                                })
                            }
                        };

                        Namely = proxyquire('..', stubs);

                        namely = new Namely({
                            accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                            companyName: 'companyName'
                        });
                    });

                    it('calls callback with results if no error returned', function () {
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
});
