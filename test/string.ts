/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Import modules;
import KarmiaUtility = require("../");
const util = require("util");
const expect = require("expect.js");

// Variables
const utility = new KarmiaUtility();


// Test
describe('karmia-utility-string', function () {
    describe('isString', function () {
        describe('Should return true', function () {
            it('String literal', function () {
                const string = 'Hello, world.';
                expect(utility.string.isString(string)).to.be(true);
            });

            it('String object', function () {
                const string = new String('Hello, world.');
                expect(utility.string.isString(string)).to.be(true);
            });
        });

        describe('Should return false', function () {
            it('Number literal', function () {
                const number = 1;
                expect(utility.string.isString(number)).to.be(false);
            });

            it('Number object', function () {
                const number = new Number(1);
                expect(utility.string.isString(number)).to.be(false);
            });

            it('Object', function () {
                const object = {};
                expect(utility.string.isString(object)).to.be(false);
            });
        });
    });

    describe('strip', function () {
        it('Should strip whitespace', function () {
            const string = 'Hello, world.';
            expect(utility.string.strip(util.format('\t   %s   \r\n', string))).to.be(string);
        });

        it('Should strip specified character', function () {
            expect(utility.string.strip('abc', 'bad')).to.be('c');
        });

        it('Should strip left string', function () {
            const string = 'Hello, world.';
            expect(utility.string.lstrip(util.format('\t   %s   \r\n', string))).to.be(util.format('%s   \r\n', string));
        });

        it('Should strip right string', function () {
            const string = 'Hello, world.';
            expect(utility.string.rstrip(util.format('\t   %s   \r\n', string))).to.be(util.format('\t   %s', string));
        });
    });

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

    describe('normalize', function () {
        it('Should normalize string', function () {
            const string = '\u202b１２３\r\nＡＢＣ\rｄｅｆ\nｱｲｳｴｵｶﾞ',
                result = '123\nABC\ndef\nアイウエオガ';

            expect(utility.string.normalize(string, 'NFKC')).to.be(result);
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

    describe('zfill', function () {
        it('Should padding left with zero', function (done) {
            const number = 1;

            expect(utility.string.zfill(number, 0)).to.be('1');
            expect(utility.string.zfill(number, 1)).to.be('1');
            expect(utility.string.zfill(number, 2)).to.be('01');
            expect(utility.string.zfill(number, 3)).to.be('001');
            expect(utility.string.zfill(number, 4)).to.be('0001');
            expect(utility.string.zfill(number, 5)).to.be('00001');

            done();
        });
    });

    describe('camelCase', function () {
        it('Should convert from snake_case', function (done) {
            const from = 'snake_case_to_camel_case',
                to = 'snakeCaseToCamelCase';

            expect(utility.string.camelCase(from)).to.be(to.charAt(0).toLowerCase() + to.substring(1));
            expect(utility.string.camelCase(from, true)).to.be(to.charAt(0).toUpperCase() + to.substring(1));

            done();
        });

        it('Should convert from kebab-case', function (done) {
            const from = 'kebab-case-to-camel-case',
                to = 'kebabCaseToCamelCase';

            expect(utility.string.camelCase(from)).to.be(to.charAt(0).toLowerCase() + to.substring(1));
            expect(utility.string.camelCase(from, true)).to.be(to.charAt(0).toUpperCase() + to.substring(1));

            done();
        });
    });

    describe('snakeCase', function () {
        it('Should convert from camelCase', function (done) {
            const from = 'camelCaseToSnakeCase',
                to = 'camel_case_to_snake_case';

            expect(utility.string.snakeCase(from)).to.be(to);

            done();
        });

        it('Should convert from kebab-case', function (done) {
            const from = 'kebab-case-to-snake-case',
                to = 'kebab_case_to_snake_case';

            expect(utility.string.snakeCase(from)).to.be(to);

            done();
        });
    });

    describe('kebabCase', function () {
        it('Should convert from camelCase', function (done) {
            const from = 'camelCaseToKebabCase',
                to = 'camel-case-to-kebab-case';

            expect(utility.string.kebabCase(from)).to.be(to);

            done();
        });

        it('Should convert from snake_case', function (done) {
            const from = 'snake_case_to_kebab_case',
                to = 'snake-case-to-kebab-case';

            expect(utility.string.kebabCase(from)).to.be(to);

            done();
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

            it('Empty string', function (done) {
                expect(utility.string.parse('')).to.eql({});

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

    describe('toBoolean', function () {
        it('Should be true', function () {
            expect(utility.string.toBoolean('true')).to.be(true);
            expect(utility.string.toBoolean('True')).to.be(true);
            expect(utility.string.toBoolean('TRUE')).to.be(true);
            expect(utility.string.toBoolean('true1')).to.be(false);
            expect(utility.string.toBoolean('false1')).to.be(false);
        });

        it('Should be false', function () {
            expect(utility.string.toBoolean('false')).to.be(false);
            expect(utility.string.toBoolean('False')).to.be(false);
            expect(utility.string.toBoolean('FALSE')).to.be(false);
        });

        it('Should not be true', function () {
            expect(utility.string.toBoolean(0)).to.be(false);
            expect(utility.string.toBoolean('')).to.be(false);
            expect(utility.string.toBoolean(false)).to.be(false);
        });

        it('Should not be false', function () {
            expect(utility.string.toBoolean(1)).to.be(true);
            expect(utility.string.toBoolean('0')).to.be(false);
            expect(utility.string.toBoolean(true)).to.be(true);
        });
    });
});
