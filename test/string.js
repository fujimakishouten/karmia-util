/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, nomen: true */
/*global describe, it */
'use strict';


// Variables
var util = require('util'),
    expect = require('expect.js'),
    utility = require('../');


// Test
describe('karmia-util', function () {
    describe('string', function () {
        describe('trim', function () {
            it('Should trim whitespace', function () {
                const string = 'Hello, world.';
                expect(utility.string.trim(util.format('\t   %s   \r\n', string))).to.be(string);
            });

            it('Should trim specified character', function () {
                expect(utility.string.trim('abc', 'bad')).to.be('c');
            });

            it('Should trim left string', function () {
                const string = 'Hello, world.';
                expect(utility.string.ltrim(util.format('\t   %s   \r\n', string))).to.be(util.format('%s   \r\n', string));
            });

            it('Should trim right string', function () {
                const string = 'Hello, world.';
                expect(utility.string.rtrim(util.format('\t   %s   \r\n', string))).to.be(util.format('\t   %s', string));
            });
        });

        describe('unquote', function () {
            describe('Should unquote string', function () {
                it('Not quoted', function (done) {
                    const string = 'Hello, world.';

                    expect(utility.string.unquote(util.format('%s', string))).to.be(string);

                    done();
                });

                it('Single quote', function (done) {
                    const string = 'Hello, world.';
                    expect(utility.string.unquote(util.format("'%s'", string))).to.be(string);

                    done();
                });

                it('Double quote', function (done) {
                    const string = 'Hello, world.';
                    expect(utility.string.unquote(util.format('"%s"', string))).to.be(string);

                    done();
                });
            });

            describe('Should not unquote string', function () {
                it('Not quoted', function (done) {
                    const string = '"Hello," world.';

                    expect(utility.string.unquote(util.format('%s', string))).to.be(string);

                    done();
                });

                it('Mismatch', function (done) {
                    const string = '"Hello, world.' + "'";

                    expect(utility.string.unquote(util.format('%s', string))).to.be(string);

                    done();
                });
            });
        });

        describe('parse', function () {
            describe('Should parse string', function () {
                it('Set delimiter', function (done) {
                    const string = 'key1=value1:key2=value2',
                        result = utility.string.parse(string, ':');

                    expect(result.key1).to.be('value1');
                    expect(result.key2).to.be('value2');

                    done();
                });

                it('Set separator', function (done) {
                    const string = 'key1:value1 key2:value2',
                        result = utility.string.parse(string, ' ', ':');

                    expect(result.key1).to.be('value1');
                    expect(result.key2).to.be('value2');

                    done();
                });

                it('Parameter includes single quote', function (done) {
                    const string = 'key1=value1, key2=value2, key3=value' + "'" + '3',
                        result = utility.string.parse(string);

                    expect(result.key1).to.be('value1');
                    expect(result.key2).to.be('value2');
                    expect(result.key3).to.be('value' + "'" + '3');

                    done();
                });

                it('Parameter includes double quote', function (done) {
                    const string = 'key1=value1, key2=value2, key3=value"3',
                        result = utility.string.parse(string);

                    expect(result.key1).to.be('value1');
                    expect(result.key2).to.be('value2');
                    expect(result.key3).to.be('value"3');

                    done();
                });

                it('Authorize header', function (done) {
                    const format = 'Digest username="%s", realm="%s", nonce="%s", uri="%s", ' +
                            'algorithm=%s, response="%s", qop=%s, nc=%s, cnonce="%s"',
                        username = 'USER_NAME',
                        realm = 'REALM',
                        nonce = 'NONCE',
                        uri = '/',
                        algorithm = 'MD5',
                        response = 'RESPONSE',
                        qop = 'auth',
                        nc = '00000001',
                        cnonce = 'CNONCE',
                        string = util.format(format, username, realm, nonce, uri, algorithm, response, qop, nc, cnonce),
                        result = utility.string.parse(string);

                    expect(result.Digest).to.be('Digest');
                    expect(result.username).to.be(username);
                    expect(result.realm).to.be(realm);
                    expect(result.nonce).to.be(nonce);
                    expect(result.uri).to.be(uri);
                    expect(result.algorithm).to.be(algorithm);
                    expect(result.response).to.be(response);
                    expect(result.qop).to.be(qop);
                    expect(result.nc).to.be(nc);
                    expect(result.cnonce).to.be(cnonce);

                    done();
                });
            });
        });
    });
});
