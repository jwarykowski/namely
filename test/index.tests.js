// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

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
                put: sandbox.stub()
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

        describe('instance methods', function () {
            it('creates get, post, and put methods', function () {
                expect(namely.get).toBeDefined();
                expect(namely.post).toBeDefined();
                expect(namely.put).toBeDefined();
            });

            it('has api methods', function () {
                expect(namely.profiles).toBeDefined();
            });
        });
    });

    describe('request methods', function () {
        describe('get, post, and put methods', function () {
            beforeEach(function () {
                namely = new Namely({
                    accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                    companyName: 'companyName'
                });
            });

            describe('get', function () {
                var getStub;

                describe('arguments', function () {
                    beforeEach(function () {
                        getStub = sandbox.stub(namely, 'get');

                        namely.get('/profiles', {}, function () {});
                    });

                    it('gets passed the correct arguments', function () {
                        expect(getStub.called).toEqual(true);
                        expect(getStub.args[0][0]).toEqual('/profiles');
                        expect(getStub.args[0][1]).toEqual({});
                        expect(typeof(getStub.args[0][2])).toEqual('function');
                    });
                });

                describe('request call', function () {
                    describe('with options', function () {
                        beforeEach(function () {
                            namely.get('/profiles', {}, function () {});
                        });

                        it('gets passed the correct path', function () {
                            expect(stubs.request.get.args[0][0]).
                                toEqual('https://companyName.namely.com/api/v1/profiles.json');
                        });

                        it('gets passed the correct options', function () {
                            expect(stubs.request.get.args[0][1]).toEqual({
                                'headers': {
                                    'authorization': 'Bearer UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT'
                                }
                            });
                        });

                        it('gets passed a callback function', function () {
                            expect(typeof(stubs.request.get.args[0][2])).toEqual('function');
                        });
                    });

                    describe('without options', function () {
                        beforeEach(function () {
                            namely.get('/profiles', function () {});
                        });

                        it('gets passed the correct path', function () {
                            expect(stubs.request.get.args[0][0]).
                                toEqual('https://companyName.namely.com/api/v1/profiles.json');
                        });

                        it('gets passed the correct options', function () {
                            expect(stubs.request.get.args[0][1]).toEqual({
                                'headers': {
                                    'authorization': 'Bearer UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT'
                                }
                            });
                        });

                        it('gets passed a callback function', function () {
                            expect(typeof(stubs.request.get.args[0][2])).toEqual('function');
                        });
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
                            namely.get('/profiles', {}, callbackSpy);
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
                            namely.get('/profiles', {}, callbackSpy);

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

            describe('post', function () {
                var postStub;

                beforeEach(function () {
                    namely.post('/profiles', {}, function () {});
                });

                describe('arguments', function () {
                    beforeEach(function () {
                        postStub = sandbox.stub(namely, 'post');

                        namely.post('/profiles', {}, function () {});
                    });

                    it('gets passed the correct arguments', function () {
                        expect(postStub.called).toEqual(true);
                        expect(postStub.args[0][0]).toEqual('/profiles');
                        expect(postStub.args[0][1]).toEqual({});
                        expect(typeof(postStub.args[0][2])).toEqual('function');
                    });
                });

                describe('request call', function () {
                    describe('with options', function () {
                        beforeEach(function () {
                            namely.post('/profiles', {}, function () {});
                        });

                        it('gets passed the correct path', function () {
                            expect(stubs.request.post.args[0][0]).
                                toEqual('https://companyName.namely.com/api/v1/profiles.json');
                        });

                        it('gets passed the correct options', function () {
                            expect(stubs.request.post.args[0][1]).toEqual({
                                'headers': {
                                    'authorization': 'Bearer UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT'
                                }
                            });
                        });

                        it('gets passed a callback function', function () {
                            expect(typeof(stubs.request.post.args[0][2])).toEqual('function');
                        });
                    });

                    describe('with no options', function () {
                        beforeEach(function () {
                            namely.post('/profiles', function () {});
                        });

                        it('gets passed the correct path', function () {
                            expect(stubs.request.post.args[0][0]).
                                toEqual('https://companyName.namely.com/api/v1/profiles.json');
                        });

                        it('gets passed the correct options', function () {
                            expect(stubs.request.post.args[0][1]).toEqual({
                                'headers': {
                                    'authorization': 'Bearer UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT'
                                }
                            });
                        });

                        it('gets passed a callback function', function () {
                            expect(typeof(stubs.request.post.args[0][2])).toEqual('function');
                        });
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
                                    post: sandbox.stub().yields('Fake Error', {}, {})
                                }
                            };

                            Namely = proxyquire('..', stubs);

                            namely = new Namely({
                                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                                companyName: 'companyName'
                            });
                        });

                        it('calls callback with error if error returned', function () {
                            namely.post('/profiles', {}, callbackSpy);
                            expect(callbackSpy.calledOnce).toEqual(true);
                            expect(callbackSpy.calledWith('Fake Error')).toEqual(true);
                        });
                    });

                    describe('no error', function () {
                        beforeEach(function () {
                            stubs = {
                                request: {
                                    post: sandbox.stub().yields(null, {
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
                            namely.post('/profiles', {}, callbackSpy);

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

            describe('put', function () {
                var putStub;

                beforeEach(function () {
                    namely.put('/profiles/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96', {}, function () {});
                });

                describe('arguments', function () {
                    beforeEach(function () {
                        putStub = sandbox.stub(namely, 'put');

                        namely.put('/profiles/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96', {}, function () {});
                    });

                    it('gets passed the correct arguments', function () {
                        expect(putStub.called).toEqual(true);
                        expect(putStub.args[0][0]).toEqual('/profiles/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                        expect(putStub.args[0][1]).toEqual({});
                        expect(typeof(putStub.args[0][2])).toEqual('function');
                    });
                });

                describe('request call', function () {
                    describe('with options', function () {
                        beforeEach(function () {
                            namely.put('/profiles', {}, function () {});
                        });

                        it('gets passed the correct path', function () {
                            expect(stubs.request.put.args[0][0]).
                                toEqual('https://companyName.namely.com/api/v1/profiles/' +
                                    'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96.json');
                        });

                        it('gets passed the correct options', function () {
                            expect(stubs.request.put.args[0][1]).toEqual({
                                'headers': {
                                    'authorization': 'Bearer UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT'
                                }
                            });
                        });

                        it('gets passed a callback function', function () {
                            expect(typeof(stubs.request.put.args[0][2])).toEqual('function');
                        });
                    });

                    describe('with no options', function () {
                        beforeEach(function () {
                            namely.put('/profiles', function () {});
                        });

                        it('gets passed the correct path', function () {
                            expect(stubs.request.put.args[0][0]).
                                toEqual('https://companyName.namely.com/api/v1/profiles/' +
                                    'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96.json');
                        });

                        it('gets passed the correct options', function () {
                            expect(stubs.request.put.args[0][1]).toEqual({
                                'headers': {
                                    'authorization': 'Bearer UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT'
                                }
                            });
                        });

                        it('gets passed a callback function', function () {
                            expect(typeof(stubs.request.put.args[0][2])).toEqual('function');
                        });
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
                                    put: sandbox.stub().yields('Fake Error', {}, {})
                                }
                            };

                            Namely = proxyquire('..', stubs);

                            namely = new Namely({
                                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                                companyName: 'companyName'
                            });
                        });

                        it('calls callback with error if error returned', function () {
                            namely.put('/profiles/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96', {}, callbackSpy);
                            expect(callbackSpy.calledOnce).toEqual(true);
                            expect(callbackSpy.calledWith('Fake Error')).toEqual(true);
                        });
                    });

                    describe('no error', function () {
                        beforeEach(function () {
                            stubs = {
                                request: {
                                    put: sandbox.stub().yields(null, {
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
                            namely.put('/profiles/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96', {}, callbackSpy);

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

    describe('profiles', function () {
        var getStub,
            profilesSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            getStub = sandbox.stub(namely, 'get');
            profilesSpy = sandbox.spy(namely, 'profiles');
        });

        describe('with no options', function () {
            beforeEach(function () {
                namely.profiles(function () {});
            });

            it('it calls profiles and passes the correct arguments', function () {
                expect(profilesSpy.calledOnce).toEqual(true);
                expect(typeof(profilesSpy.args[0][0])).toEqual('function');
            });

            it('it calls get and passes the correct arguments', function () {
                expect(getStub.calledOnce).toEqual(true);
                expect(getStub.args[0][0]).toEqual('/profiles');
                expect(typeof(getStub.args[0][1])).toEqual('function');
                expect(getStub.args[0][2]).toEqual(undefined);
            });
        });

        describe('with options', function () {
            beforeEach(function () {
                namely.profiles({
                    body: {
                        limit: 100,
                        after: '12345678790'
                    }
                }, function () {});
            });

            it('it calls profiles and passes the correct arguments', function () {
                expect(profilesSpy.calledOnce).toEqual(true);
                expect(profilesSpy.args[0][0]).toEqual({
                    body: {
                        limit: 100,
                        after: '12345678790'
                    }
                });
            });

            it('it calls get and passes the correct arguments', function () {
                expect(getStub.calledOnce).toEqual(true);
                expect(getStub.args[0][0]).toEqual('/profiles');
                expect(getStub.args[0][1]).toEqual({
                    body: {
                        limit: 100,
                        after: '12345678790'
                    }
                });
                expect(typeof(getStub.args[0][2])).toEqual('function');
            });
        });
    });

    describe('profile', function () {
        var getStub,
            profileSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            getStub = sandbox.stub(namely, 'get');
            profileSpy = sandbox.spy(namely, 'profile');
        });

        describe('with no options', function () {
            beforeEach(function () {
                namely.profile('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96', function () {});
            });

            it('it calls profile and passes the correct arguments', function () {
                expect(profileSpy.calledOnce).toEqual(true);
                expect(profileSpy.args[0][0]).toEqual('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(typeof(profileSpy.args[0][1])).toEqual('function');
            });

            it('it calls get and passes the correct arguments', function () {
                expect(getStub.calledOnce).toEqual(true);
                expect(getStub.args[0][0]).toEqual('/profiles/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(typeof(getStub.args[0][1])).toEqual('function');
                expect(getStub.args[0][2]).toEqual(undefined);
            });
        });
    });

    describe('createProfile', function () {
        var postStub,
            createProfileSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            postStub = sandbox.stub(namely, 'post');
            createProfileSpy = sandbox.spy(namely, 'createProfile');
        });

        describe('with options', function () {
            beforeEach(function () {
                namely.createProfile({
                    body: {
                        first_name: 'first name',
                        last_name: 'last name',
                        email: 'email@address.com',
                        user_status: 'active',
                        start_date: '2015-03-27',
                        end_date: '2015-03-28',
                        departure_date: '2015-03-28',
                        gender: 'Male',
                        marital_status: 'Single',
                        job_title: 'CEO',
                        resume: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96',
                        image: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96',
                        office: '123 Office Address',
                        home: '123 Home Address'
                    }
                }, function () {});
            });

            it('it calls createProfile and passes the correct arguments', function () {
                expect(createProfileSpy.calledOnce).toEqual(true);
                expect(createProfileSpy.args[0][0]).toEqual({
                    body: {
                        first_name: 'first name',
                        last_name: 'last name',
                        email: 'email@address.com',
                        user_status: 'active',
                        start_date: '2015-03-27',
                        end_date: '2015-03-28',
                        departure_date: '2015-03-28',
                        gender: 'Male',
                        marital_status: 'Single',
                        job_title: 'CEO',
                        resume: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96',
                        image: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96',
                        office: '123 Office Address',
                        home: '123 Home Address'
                    }
                });
                expect(typeof(createProfileSpy.args[0][1])).toEqual('function');
            });

            it('it calls post and passes the correct arguments', function () {
                expect(postStub.calledOnce).toEqual(true);
                expect(postStub.args[0][0]).toEqual('/profiles');
                expect(postStub.args[0][1]).toEqual({
                    body: {
                        first_name: 'first name',
                        last_name: 'last name',
                        email: 'email@address.com',
                        user_status: 'active',
                        start_date: '2015-03-27',
                        end_date: '2015-03-28',
                        departure_date: '2015-03-28',
                        gender: 'Male',
                        marital_status: 'Single',
                        job_title: 'CEO',
                        resume: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96',
                        image: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96',
                        office: '123 Office Address',
                        home: '123 Home Address'
                    }
                });
                expect(typeof(postStub.args[0][2])).toEqual('function');
            });
        });
    });

    describe('updateProfile', function () {
        var putStub,
            updateProfileSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            putStub = sandbox.stub(namely, 'put');
            updateProfileSpy = sandbox.spy(namely, 'updateProfile');
        });

        describe('with options', function () {
            beforeEach(function () {
                namely.updateProfile('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96', {
                    body: {
                        first_name: 'first name',
                        last_name: 'last name',
                        email: 'email@address.com',
                        user_status: 'active',
                        start_date: '2015-03-27',
                        end_date: '2015-03-28',
                        departure_date: '2015-03-28',
                        gender: 'Male',
                        marital_status: 'Single',
                        job_title: 'CEO',
                        resume: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96',
                        image: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96',
                        office: '123 Office Address',
                        home: '123 Home Address'
                    }
                }, function () {});
            });

            it('it calls updateProfile and passes the correct arguments', function () {
                expect(updateProfileSpy.calledOnce).toEqual(true);
                expect(updateProfileSpy.args[0][0]).toEqual('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(updateProfileSpy.args[0][1]).toEqual({
                    body: {
                        first_name: 'first name',
                        last_name: 'last name',
                        email: 'email@address.com',
                        user_status: 'active',
                        start_date: '2015-03-27',
                        end_date: '2015-03-28',
                        departure_date: '2015-03-28',
                        gender: 'Male',
                        marital_status: 'Single',
                        job_title: 'CEO',
                        resume: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96',
                        image: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96',
                        office: '123 Office Address',
                        home: '123 Home Address'
                    }
                });
                expect(typeof(updateProfileSpy.args[0][2])).toEqual('function');
            });

            it('it calls put and passes the correct arguments', function () {
                expect(putStub.calledOnce).toEqual(true);
                expect(putStub.args[0][0]).toEqual('/profiles/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(putStub.args[0][1]).toEqual({
                    body: {
                        first_name: 'first name',
                        last_name: 'last name',
                        email: 'email@address.com',
                        user_status: 'active',
                        start_date: '2015-03-27',
                        end_date: '2015-03-28',
                        departure_date: '2015-03-28',
                        gender: 'Male',
                        marital_status: 'Single',
                        job_title: 'CEO',
                        resume: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96',
                        image: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96',
                        office: '123 Office Address',
                        home: '123 Home Address'
                    }
                });
                expect(typeof(putStub.args[0][2])).toEqual('function');
            });
        });
    });

    describe('me', function () {
        var getStub,
            meSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            getStub = sandbox.stub(namely, 'get');
            meSpy = sandbox.spy(namely, 'me');
        });

        describe('with no options', function () {
            beforeEach(function () {
                namely.me(function () {});
            });

            it('it calls me and passes the correct arguments', function () {
                expect(meSpy.calledOnce).toEqual(true);
                expect(typeof(meSpy.args[0][0])).toEqual('function');
                expect(meSpy.args[0][1]).toEqual(undefined);
            });

            it('it calls get and passes the correct arguments', function () {
                expect(getStub.calledOnce).toEqual(true);
                expect(getStub.args[0][0]).toEqual('/profiles/me');
                expect(typeof(getStub.args[0][1])).toEqual('function');
                expect(getStub.args[0][2]).toEqual(undefined);
            });
        });
    });

    describe('fields', function () {
        var getStub,
            fieldsSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            getStub = sandbox.stub(namely, 'get');
            fieldsSpy = sandbox.spy(namely, 'fields');
        });

        describe('with no options', function () {
            beforeEach(function () {
                namely.fields(function () {});
            });

            it('it calls fields and passes the correct arguments', function () {
                expect(fieldsSpy.calledOnce).toEqual(true);
                expect(typeof(fieldsSpy.args[0][0])).toEqual('function');
            });

            it('it calls get and passes the correct arguments', function () {
                expect(getStub.calledOnce).toEqual(true);
                expect(getStub.args[0][0]).toEqual('/profiles/fields');
                expect(typeof(getStub.args[0][1])).toEqual('function');
                expect(getStub.args[0][2]).toEqual(undefined);
            });
        });
    });

    describe('createField', function () {
        var postStub,
            createFieldSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            postStub = sandbox.stub(namely, 'post');
            createFieldSpy = sandbox.spy(namely, 'createField');
        });

        describe('with options', function () {
            beforeEach(function () {
                namely.createField({
                    body: {
                        section_id: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96',
                        title: 'title',
                        type: 'Text',
                        choices: []
                    }
                }, function () {});
            });

            it('it calls createField and passes the correct arguments', function () {
                expect(createFieldSpy.calledOnce).toEqual(true);
                expect(createFieldSpy.args[0][0]).toEqual({
                    body: {
                        section_id: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96',
                        title: 'title',
                        type: 'Text',
                        choices: []
                    }
                });
                expect(typeof(createFieldSpy.args[0][1])).toEqual('function');
            });

            it('it calls post and passes the correct arguments', function () {
                expect(postStub.calledOnce).toEqual(true);
                expect(postStub.args[0][0]).toEqual('/profiles/fields');
                expect(postStub.args[0][1]).toEqual({
                    body: {
                        section_id: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96',
                        title: 'title',
                        type: 'Text',
                        choices: []
                    }
                });
                expect(typeof(postStub.args[0][2])).toEqual('function');
            });
        });
    });

    describe('updateField', function () {
        var putStub,
            updateFieldSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            putStub = sandbox.stub(namely, 'put');
            updateFieldSpy = sandbox.spy(namely, 'updateField');
        });

        describe('with options', function () {
            beforeEach(function () {
                namely.updateField('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96', {
                    body: {
                        section_id: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96',
                        title: 'title',
                        type: 'Text',
                        choices: []
                    }
                }, function () {});
            });

            it('it calls updateField and passes the correct arguments', function () {
                expect(updateFieldSpy.calledOnce).toEqual(true);
                expect(updateFieldSpy.args[0][0]).toEqual('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(updateFieldSpy.args[0][1]).toEqual({
                    body: {
                        section_id: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96',
                        title: 'title',
                        type: 'Text',
                        choices: []
                    }
                });
                expect(typeof(updateFieldSpy.args[0][2])).toEqual('function');
            });

            it('it calls put and passes the correct arguments', function () {
                expect(putStub.calledOnce).toEqual(true);
                expect(putStub.args[0][0]).toEqual('/profiles/fields/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(putStub.args[0][1]).toEqual({
                    body: {
                        section_id: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96',
                        title: 'title',
                        type: 'Text',
                        choices: []
                    }
                });
                expect(typeof(putStub.args[0][2])).toEqual('function');
            });
        });
    });

    describe('sections', function () {
        var getStub,
            sectionsSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            getStub = sandbox.stub(namely, 'get');
            sectionsSpy = sandbox.spy(namely, 'sections');
        });

        describe('with no options', function () {
            beforeEach(function () {
                namely.sections(function () {});
            });

            it('it calls sections and passes the correct arguments', function () {
                expect(sectionsSpy.calledOnce).toEqual(true);
                expect(typeof(sectionsSpy.args[0][0])).toEqual('function');
            });

            it('it calls get and passes the correct arguments', function () {
                expect(getStub.calledOnce).toEqual(true);
                expect(getStub.args[0][0]).toEqual('/profiles/fields/sections');
                expect(typeof(getStub.args[0][1])).toEqual('function');
                expect(getStub.args[0][2]).toEqual(undefined);
            });
        });
    });

    describe('section', function () {
        var getStub,
            sectionSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            getStub = sandbox.stub(namely, 'get');
            sectionSpy = sandbox.spy(namely, 'section');
        });

        describe('with no options', function () {
            beforeEach(function () {
                namely.section('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96', function () {});
            });

            it('it calls section and passes the correct arguments', function () {
                expect(sectionSpy.calledOnce).toEqual(true);
                expect(sectionSpy.args[0][0]).toEqual('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(typeof(sectionSpy.args[0][1])).toEqual('function');
            });

            it('it calls get and passes the correct arguments', function () {
                expect(getStub.calledOnce).toEqual(true);
                expect(getStub.args[0][0]).toEqual('/profiles/fields/sections/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(typeof(getStub.args[0][1])).toEqual('function');
                expect(getStub.args[0][2]).toEqual(undefined);
            });
        });
    });

    describe('createSection', function () {
        var postStub,
            createSectionSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            postStub = sandbox.stub(namely, 'post');
            createSectionSpy = sandbox.spy(namely, 'createSection');
        });

        describe('with options', function () {
            beforeEach(function () {
                namely.createSection({
                    body: {
                        title: 'section title'
                    }
                }, function () {});
            });

            it('it calls createSection and passes the correct arguments', function () {
                expect(createSectionSpy.calledOnce).toEqual(true);
                expect(createSectionSpy.args[0][0]).toEqual({
                    body: {
                        title: 'section title'
                    }
                });
                expect(typeof(createSectionSpy.args[0][1])).toEqual('function');
            });

            it('it calls post and passes the correct arguments', function () {
                expect(postStub.calledOnce).toEqual(true);
                expect(postStub.args[0][0]).toEqual('/profiles/fields/sections');
                expect(postStub.args[0][1]).toEqual({
                    body: {
                        title: 'section title'
                    }
                });
                expect(typeof(postStub.args[0][2])).toEqual('function');
            });
        });
    });

    describe('updateSection', function () {
        var putStub,
            updatedSectionSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            putStub = sandbox.stub(namely, 'put');
            updatedSectionSpy = sandbox.spy(namely, 'updateSection');
        });

        describe('with options', function () {
            beforeEach(function () {
                namely.updateSection('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96', {
                    body: {
                        title: 'updated section title'
                    }
                }, function () {});
            });

            it('it calls updateSection and passes the correct arguments', function () {
                expect(updatedSectionSpy.calledOnce).toEqual(true);
                expect(updatedSectionSpy.args[0][0]).toEqual('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(updatedSectionSpy.args[0][1]).toEqual({
                    body: {
                        title: 'updated section title'
                    }
                });
                expect(typeof(updatedSectionSpy.args[0][2])).toEqual('function');
            });

            it('it calls put and passes the correct arguments', function () {
                expect(putStub.calledOnce).toEqual(true);
                expect(putStub.args[0][0]).toEqual('/profiles/fields/sections/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(putStub.args[0][1]).toEqual({
                    body: {
                        title: 'updated section title'
                    }
                });
                expect(typeof(putStub.args[0][2])).toEqual('function');
            });
        });
    });

    describe('createFile', function () {
        var postStub,
            createFileSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            postStub = sandbox.stub(namely, 'post');
            createFileSpy = sandbox.spy(namely, 'createFile');
        });

        describe('with options', function () {
            beforeEach(function () {
                namely.createFile({
                    body: {
                        id:'d5b3cb26-8b17-4f18-9af7-f678fa6a2e96',
                        filename:'file.jpg',
                        mime_type:'image/jpeg',
                        original:'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/download',
                        thumbs:{
                            '75x75':'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/image/75x75.jpg',
                            '75x75c':'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/image/75x75c.jpg',
                            '150x150':'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/image/150x150.jpg',
                            '150x150c':'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/image/150x150c.jpg',
                            '300x300':'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/image/300x300.jpg',
                            '450x450':'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/image/450x450.jpg',
                            '800x800':'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/image/800x800.jpg'
                        }
                    }
                }, function () {});
            });

            it('it calls createFile and passes the correct arguments', function () {
                expect(createFileSpy.calledOnce).toEqual(true);
                expect(createFileSpy.args[0][0]).toEqual({
                    body: {
                        id:'d5b3cb26-8b17-4f18-9af7-f678fa6a2e96',
                        filename:'file.jpg',
                        mime_type:'image/jpeg',
                        original:'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/download',
                        thumbs:{
                            '75x75':'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/image/75x75.jpg',
                            '75x75c':'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/image/75x75c.jpg',
                            '150x150':'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/image/150x150.jpg',
                            '150x150c':'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/image/150x150c.jpg',
                            '300x300':'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/image/300x300.jpg',
                            '450x450':'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/image/450x450.jpg',
                            '800x800':'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/image/800x800.jpg'
                        }
                    }
                });
                expect(typeof(createFileSpy.args[0][1])).toEqual('function');
            });

            it('it calls post and passes the correct arguments', function () {
                expect(postStub.calledOnce).toEqual(true);
                expect(postStub.args[0][0]).toEqual('/files');
                expect(postStub.args[0][1]).toEqual({
                    body: {
                        id:'d5b3cb26-8b17-4f18-9af7-f678fa6a2e96',
                        filename:'file.jpg',
                        mime_type:'image/jpeg',
                        original:'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/download',
                        thumbs:{
                            '75x75':'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/image/75x75.jpg',
                            '75x75c':'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/image/75x75c.jpg',
                            '150x150':'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/image/150x150.jpg',
                            '150x150c':'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/image/150x150c.jpg',
                            '300x300':'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/image/300x300.jpg',
                            '450x450':'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/image/450x450.jpg',
                            '800x800':'/files/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96/image/800x800.jpg'
                        }
                    }
                });
                expect(typeof(postStub.args[0][2])).toEqual('function');
            });
        });
    });

    describe('events', function () {
        var getStub,
            eventsSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            getStub = sandbox.stub(namely, 'get');
            eventsSpy = sandbox.spy(namely, 'events');
        });

        describe('with no options', function () {
            beforeEach(function () {
                namely.events(function () {});
            });

            it('it calls events and passes the correct arguments', function () {
                expect(eventsSpy.calledOnce).toEqual(true);
                expect(typeof(eventsSpy.args[0][0])).toEqual('function');
            });

            it('it calls get and passes the correct arguments', function () {
                expect(getStub.calledOnce).toEqual(true);
                expect(getStub.args[0][0]).toEqual('/events');
                expect(typeof(getStub.args[0][1])).toEqual('function');
                expect(getStub.args[0][2]).toEqual(undefined);
            });
        });

        describe('with options', function () {
            beforeEach(function () {
                namely.events({
                    body: {
                        limit: 100,
                        after: '12345678790'
                    }
                }, function () {});
            });

            it('it calls events and passes the correct arguments', function () {
                expect(eventsSpy.calledOnce).toEqual(true);
                expect(eventsSpy.args[0][0]).toEqual({
                    body: {
                        limit: 100,
                        after: '12345678790'
                    }
                });
            });

            it('it calls get and passes the correct arguments', function () {
                expect(getStub.calledOnce).toEqual(true);
                expect(getStub.args[0][0]).toEqual('/events');
                expect(getStub.args[0][1]).toEqual({
                    body: {
                        limit: 100,
                        after: '12345678790'
                    }
                });
                expect(typeof(getStub.args[0][2])).toEqual('function');
            });
        });
    });

    describe('event', function () {
        var getStub,
            eventSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            getStub = sandbox.stub(namely, 'get');
            eventSpy = sandbox.spy(namely, 'event');
        });

        describe('with no options', function () {
            beforeEach(function () {
                namely.event('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96', function () {});
            });

            it('it calls event and passes the correct arguments', function () {
                expect(eventSpy.calledOnce).toEqual(true);
                expect(eventSpy.args[0][0]).toEqual('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(typeof(eventSpy.args[0][1])).toEqual('function');
            });

            it('it calls get and passes the correct arguments', function () {
                expect(getStub.calledOnce).toEqual(true);
                expect(getStub.args[0][0]).toEqual('/events/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(typeof(getStub.args[0][1])).toEqual('function');
                expect(getStub.args[0][2]).toEqual(undefined);
            });
        });
    });

    describe('createEvent', function () {
        var postStub,
            createEventSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            postStub = sandbox.stub(namely, 'post');
            createEventSpy = sandbox.spy(namely, 'createEvent');
        });

        describe('with options', function () {
            beforeEach(function () {
                namely.createEvent({
                    body: {
                        content: 'Content',
                        file: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96'
                    }
                }, function () {});
            });

            it('it calls createEvent and passes the correct arguments', function () {
                expect(createEventSpy.calledOnce).toEqual(true);
                expect(createEventSpy.args[0][0]).toEqual({
                    body: {
                        content: 'Content',
                        file: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96'
                    }
                });
                expect(typeof(createEventSpy.args[0][1])).toEqual('function');
            });

            it('it calls post and passes the correct arguments', function () {
                expect(postStub.calledOnce).toEqual(true);
                expect(postStub.args[0][0]).toEqual('/events');
                expect(postStub.args[0][1]).toEqual({
                    body: {
                        content: 'Content',
                        file: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96'
                    }
                });
                expect(typeof(postStub.args[0][2])).toEqual('function');
            });
        });
    });

    describe('updateEvent', function () {
        var putStub,
            updateEventSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            putStub = sandbox.stub(namely, 'put');
            updateEventSpy = sandbox.spy(namely, 'updateEvent');
        });

        describe('with options', function () {
            beforeEach(function () {
                namely.updateEvent('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96', {
                    body: {
                        content: 'Content',
                        file: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96'
                    }
                }, function () {});
            });

            it('it calls updateEvent and passes the correct arguments', function () {
                expect(updateEventSpy.calledOnce).toEqual(true);
                expect(updateEventSpy.args[0][0]).toEqual('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(updateEventSpy.args[0][1]).toEqual({
                    body: {
                        content: 'Content',
                        file: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96'
                    }
                });
                expect(typeof(updateEventSpy.args[0][2])).toEqual('function');
            });

            it('it calls put and passes the correct arguments', function () {
                expect(putStub.calledOnce).toEqual(true);
                expect(putStub.args[0][0]).toEqual('/events/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(putStub.args[0][1]).toEqual({
                    body: {
                        content: 'Content',
                        file: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96'
                    }
                });
                expect(typeof(putStub.args[0][2])).toEqual('function');
            });
        });
    });

    describe('currencyTypes', function () {
        var getStub,
            currencyTypesSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            getStub = sandbox.stub(namely, 'get');
            currencyTypesSpy = sandbox.spy(namely, 'currencyTypes');
        });

        describe('with no options', function () {
            beforeEach(function () {
                namely.currencyTypes(function () {});
            });

            it('it calls currencyTypes and passes the correct arguments', function () {
                expect(currencyTypesSpy.calledOnce).toEqual(true);
                expect(typeof(currencyTypesSpy.args[0][0])).toEqual('function');
            });

            it('it calls get and passes the correct arguments', function () {
                expect(getStub.calledOnce).toEqual(true);
                expect(getStub.args[0][0]).toEqual('/currency_types');
                expect(typeof(getStub.args[0][1])).toEqual('function');
                expect(getStub.args[0][2]).toEqual(undefined);
            });
        });
    });

    describe('countries', function () {
        var getStub,
            countriesSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            getStub = sandbox.stub(namely, 'get');
            countriesSpy = sandbox.spy(namely, 'countries');
        });

        describe('with no options', function () {
            beforeEach(function () {
                namely.countries(function () {});
            });

            it('it calls countries and passes the correct arguments', function () {
                expect(countriesSpy.calledOnce).toEqual(true);
                expect(typeof(countriesSpy.args[0][0])).toEqual('function');
            });

            it('it calls get and passes the correct arguments', function () {
                expect(getStub.calledOnce).toEqual(true);
                expect(getStub.args[0][0]).toEqual('/countries');
                expect(typeof(getStub.args[0][1])).toEqual('function');
                expect(getStub.args[0][2]).toEqual(undefined);
            });
        });
    });

    describe('country', function () {
        var getStub,
            countrySpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            getStub = sandbox.stub(namely, 'get');
            countrySpy = sandbox.spy(namely, 'country');
        });

        describe('with no options', function () {
            beforeEach(function () {
                namely.country('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96', function () {});
            });

            it('it calls country and passes the correct arguments', function () {
                expect(countrySpy.calledOnce).toEqual(true);
                expect(countrySpy.args[0][0]).toEqual('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(typeof(countrySpy.args[0][1])).toEqual('function');
            });

            it('it calls get and passes the correct arguments', function () {
                expect(getStub.calledOnce).toEqual(true);
                expect(getStub.args[0][0]).toEqual('/countries/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(typeof(getStub.args[0][1])).toEqual('function');
                expect(getStub.args[0][2]).toEqual(undefined);
            });
        });
    });

    describe('jobTitles', function () {
        var getStub,
            jobTitlesSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            getStub = sandbox.stub(namely, 'get');
            jobTitlesSpy = sandbox.spy(namely, 'jobTitles');
        });

        describe('with no options', function () {
            beforeEach(function () {
                namely.jobTitles(function () {});
            });

            it('it calls jobTitles and passes the correct arguments', function () {
                expect(jobTitlesSpy.calledOnce).toEqual(true);
                expect(typeof(jobTitlesSpy.args[0][0])).toEqual('function');
            });

            it('it calls get and passes the correct arguments', function () {
                expect(getStub.calledOnce).toEqual(true);
                expect(getStub.args[0][0]).toEqual('/job_titles');
                expect(typeof(getStub.args[0][1])).toEqual('function');
                expect(getStub.args[0][2]).toEqual(undefined);
            });
        });
    });

    describe('jobTitle', function () {
        var getStub,
            jobTitleSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            getStub = sandbox.stub(namely, 'get');
            jobTitleSpy = sandbox.spy(namely, 'jobTitle');
        });

        describe('with no options', function () {
            beforeEach(function () {
                namely.jobTitle('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96', function () {});
            });

            it('it calls jobTitle and passes the correct arguments', function () {
                expect(jobTitleSpy.calledOnce).toEqual(true);
                expect(jobTitleSpy.args[0][0]).toEqual('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(typeof(jobTitleSpy.args[0][1])).toEqual('function');
            });

            it('it calls get and passes the correct arguments', function () {
                expect(getStub.calledOnce).toEqual(true);
                expect(getStub.args[0][0]).toEqual('/job_titles/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(typeof(getStub.args[0][1])).toEqual('function');
                expect(getStub.args[0][2]).toEqual(undefined);
            });
        });
    });

    describe('createJobTitle', function () {
        var postStub,
            createJobTitleSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            postStub = sandbox.stub(namely, 'post');
            createJobTitleSpy = sandbox.spy(namely, 'createJobTitle');
        });

        describe('with options', function () {
            beforeEach(function () {
                namely.createJobTitle({
                    body: {
                        title: 'job title',
                        job_tier: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96'
                    }
                }, function () {});
            });

            it('it calls createJobTitle and passes the correct arguments', function () {
                expect(createJobTitleSpy.calledOnce).toEqual(true);
                expect(createJobTitleSpy.args[0][0]).toEqual({
                    body: {
                        title: 'job title',
                        job_tier: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96'
                    }
                });
                expect(typeof(createJobTitleSpy.args[0][1])).toEqual('function');
            });

            it('it calls post and passes the correct arguments', function () {
                expect(postStub.calledOnce).toEqual(true);
                expect(postStub.args[0][0]).toEqual('/job_titles');
                expect(postStub.args[0][1]).toEqual({
                    body: {
                        title: 'job title',
                        job_tier: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96'
                    }
                });
                expect(typeof(postStub.args[0][2])).toEqual('function');
            });
        });
    });

    describe('updateJobTitle', function () {
        var putStub,
            updateJobTitleSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            putStub = sandbox.stub(namely, 'put');
            updateJobTitleSpy = sandbox.spy(namely, 'updateJobTitle');
        });

        describe('with options', function () {
            beforeEach(function () {
                namely.updateJobTitle('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96', {
                    body: {
                        title: 'job title',
                        job_tier: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96'
                    }
                }, function () {});
            });

            it('it calls updateJobTitle and passes the correct arguments', function () {
                expect(updateJobTitleSpy.calledOnce).toEqual(true);
                expect(updateJobTitleSpy.args[0][0]).toEqual('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(updateJobTitleSpy.args[0][1]).toEqual({
                    body: {
                        title: 'job title',
                        job_tier: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96'
                    }
                });
                expect(typeof(updateJobTitleSpy.args[0][2])).toEqual('function');
            });

            it('it calls put and passes the correct arguments', function () {
                expect(putStub.calledOnce).toEqual(true);
                expect(putStub.args[0][0]).toEqual('/job_titles/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(putStub.args[0][1]).toEqual({
                    body: {
                        title: 'job title',
                        job_tier: 'd5b3cb26-8b17-4f18-9af7-f678fa6a2e96'
                    }
                });
                expect(typeof(putStub.args[0][2])).toEqual('function');
            });
        });
    });

    describe('jobTiers', function () {
        var getStub,
            jobTiersSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            getStub = sandbox.stub(namely, 'get');
            jobTiersSpy = sandbox.spy(namely, 'jobTiers');
        });

        describe('with no options', function () {
            beforeEach(function () {
                namely.jobTiers(function () {});
            });

            it('it calls jobTiers and passes the correct arguments', function () {
                expect(jobTiersSpy.calledOnce).toEqual(true);
                expect(typeof(jobTiersSpy.args[0][0])).toEqual('function');
            });

            it('it calls get and passes the correct arguments', function () {
                expect(getStub.calledOnce).toEqual(true);
                expect(getStub.args[0][0]).toEqual('/job_tiers');
                expect(typeof(getStub.args[0][1])).toEqual('function');
                expect(getStub.args[0][2]).toEqual(undefined);
            });
        });
    });

    describe('jobTier', function () {
        var getStub,
            jobTierSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            getStub = sandbox.stub(namely, 'get');
            jobTierSpy = sandbox.spy(namely, 'jobTier');
        });

        describe('with no options', function () {
            beforeEach(function () {
                namely.jobTier('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96', function () {});
            });

            it('it calls jobTier and passes the correct arguments', function () {
                expect(jobTierSpy.calledOnce).toEqual(true);
                expect(jobTierSpy.args[0][0]).toEqual('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(typeof(jobTierSpy.args[0][1])).toEqual('function');
            });

            it('it calls get and passes the correct arguments', function () {
                expect(getStub.calledOnce).toEqual(true);
                expect(getStub.args[0][0]).toEqual('/job_tiers/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(typeof(getStub.args[0][1])).toEqual('function');
                expect(getStub.args[0][2]).toEqual(undefined);
            });
        });
    });

    describe('createJobTier', function () {
        var postStub,
            createJobTierSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            postStub = sandbox.stub(namely, 'post');
            createJobTierSpy = sandbox.spy(namely, 'createJobTier');
        });

        describe('with options', function () {
            beforeEach(function () {
                namely.createJobTier({
                    body: {
                        title: 'job tier'
                    }
                }, function () {});
            });

            it('it calls createJobTier and passes the correct arguments', function () {
                expect(createJobTierSpy.calledOnce).toEqual(true);
                expect(createJobTierSpy.args[0][0]).toEqual({
                    body: {
                        title: 'job tier'
                    }
                });
                expect(typeof(createJobTierSpy.args[0][1])).toEqual('function');
            });

            it('it calls post and passes the correct arguments', function () {
                expect(postStub.calledOnce).toEqual(true);
                expect(postStub.args[0][0]).toEqual('/job_tiers');
                expect(postStub.args[0][1]).toEqual({
                    body: {
                        title: 'job tier'
                    }
                });
                expect(typeof(postStub.args[0][2])).toEqual('function');
            });
        });
    });

    describe('updateJobTier', function () {
        var putStub,
            updateJobTierSpy;

        beforeEach(function () {
            namely = new Namely({
                accessToken: 'UBLIJWQAPSONNTCLWQEFOZCCESLEJRVT',
                companyName: 'companyName'
            });

            putStub = sandbox.stub(namely, 'put');
            updateJobTierSpy = sandbox.spy(namely, 'updateJobTier');
        });

        describe('with options', function () {
            beforeEach(function () {
                namely.updateJobTier('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96', {
                    body: {
                        title: 'job tier'
                    }
                }, function () {});
            });

            it('it calls updateJobTier and passes the correct arguments', function () {
                expect(updateJobTierSpy.calledOnce).toEqual(true);
                expect(updateJobTierSpy.args[0][0]).toEqual('d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(updateJobTierSpy.args[0][1]).toEqual({
                    body: {
                        title: 'job tier'
                    }
                });
                expect(typeof(updateJobTierSpy.args[0][2])).toEqual('function');
            });

            it('it calls put and passes the correct arguments', function () {
                expect(putStub.calledOnce).toEqual(true);
                expect(putStub.args[0][0]).toEqual('/job_tiers/d5b3cb26-8b17-4f18-9af7-f678fa6a2e96');
                expect(putStub.args[0][1]).toEqual({
                    body: {
                        title: 'job tier'
                    }
                });
                expect(typeof(putStub.args[0][2])).toEqual('function');
            });
        });
    });
});
