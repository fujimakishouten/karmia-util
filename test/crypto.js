/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, nomen: true */
/*global describe, it */
'use strict';


// Variables
var expect = require('expect.js'),
    kutil = require('../');


// Test
describe('karmia-util', function () {
    describe('crypto', function () {
        describe('hash', function () {
            it('Should calculate md5 hash', function () {
                var algorithm = 'md5',
                    string = 'test';

                expect(kutil.crypto.hash(algorithm, string)).to.have.length(32);
            });

            it('Should calculate sha1 hash', function () {
                var algorithm = 'sha1',
                    string = 'test';

                expect(kutil.crypto.hash(algorithm, string)).to.have.length(40);
            });
        });

        describe('sha256', function () {
            it('Should calculate sha256 hash', function () {
                var string = 'test';

                expect(kutil.crypto.sha256(string)).to.have.length(64);
            });
        });

        describe('sha512', function () {
            it('Should calculate sha512 hash', function () {
                var string = 'test';

                expect(kutil.crypto.sha512(string)).to.have.length(128);
            });
        });

        describe('encrypt', function () {
            it('Should encrypt string', function () {
                var algorithm = 'aes-256-ctr',
                    password = 'password',
                    string = 'test';

                expect(kutil.crypto.encrypt(algorithm, password, string)).to.have.length(8);
            });
        });

        describe('decrypt', function () {
            it('Should decrypt string', function () {
                var algorithm = 'aes-256-ctr',
                    password = 'password',
                    string = 'test',
                    data = kutil.crypto.encrypt(algorithm, password, string);
                expect(kutil.crypto.decrypt(algorithm, password, data)).to.be(string);
            });
        });
    });
});
