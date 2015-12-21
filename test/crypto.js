/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, nomen: true */
/*global describe, it */
'use strict';


// Variables
const expect = require('expect.js'),
    utility = require('../');


// Test
describe('karmia-util', function () {
    describe('crypto', function () {
        describe('hash', function () {
            it('Should calculate md5 hash', function () {
                const algorithm = 'md5',
                    buffer = new Buffer('test');

                expect(utility.crypto.hash(algorithm, buffer)).to.have.length(32);
            });

            it('Should calculate sha1 hash', function () {
                const algorithm = 'sha1',
                    buffer = new Buffer('test');

                expect(utility.crypto.hash(algorithm, buffer)).to.have.length(40);
            });
        });

        describe('sha256', function () {
            it('Should calculate sha256 hash', function () {
                const buffer = new Buffer('test');

                expect(utility.crypto.sha256(buffer)).to.have.length(64);
            });
        });

        describe('sha512', function () {
            it('Should calculate sha512 hash', function () {
                const buffer = new Buffer('test');

                expect(utility.crypto.sha512(buffer)).to.have.length(128);
            });
        });

        describe('encrypt', function () {
            it('Should encrypt string', function () {
                const algorithm = 'aes-256-ctr',
                    password = 'password',
                    buffer = new Buffer('test');

                expect(utility.crypto.encrypt(algorithm, password, buffer)).to.have.length(4);
            });
        });

        describe('decrypt', function () {
            it('Should decrypt string', function () {
                const algorithm = 'aes-256-ctr',
                    password = 'password',
                    buffer = new Buffer('test'),
                    data = utility.crypto.encrypt(algorithm, password, buffer);
                expect(utility.crypto.decrypt(algorithm, password, data)).to.eql(buffer);
            });
        });
    });
});
