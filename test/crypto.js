/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, nomen: true */
/*global describe, it */
'use strict';


// Variables
var expect = require('expect.js'),
    utility = require('../');


// Test
describe('karmia-util', function () {
    describe('crypto', function () {
        describe('hash', function () {
            it('Should calculate md5 hash', function () {
                var algorithm = 'md5',
                    string = 'test';

                expect(utility.crypto.hash(algorithm, string)).to.have.length(32);
            });

            it('Should calculate sha1 hash', function () {
                var algorithm = 'sha1',
                    string = 'test';

                expect(utility.crypto.hash(algorithm, string)).to.have.length(40);
            });
        });

        describe('sha256', function () {
            it('Should calculate sha256 hash', function () {
                var string = 'test';

                expect(utility.crypto.sha256(string)).to.have.length(64);
            });
        });

        describe('sha512', function () {
            it('Should calculate sha512 hash', function () {
                var string = 'test';

                expect(utility.crypto.sha512(string)).to.have.length(128);
            });
        });

        describe('encrypt', function () {
            it('Should encrypt string', function () {
                var algorithm = 'aes-256-ctr',
                    password = 'password',
                    string = 'test';

                expect(utility.crypto.encrypt(algorithm, password, string)).to.have.length(8);
            });
        });

        describe('decrypt', function () {
            it('Should decrypt string', function () {
                var algorithm = 'aes-256-ctr',
                    password = 'password',
                    string = 'test',
                    data = utility.crypto.encrypt(algorithm, password, string);
                expect(utility.crypto.decrypt(algorithm, password, data)).to.be(string);
            });
        });
    });
});
