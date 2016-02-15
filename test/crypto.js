/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, nomen: true */
/*global describe, it */
'use strict';


// Variables
const crypto = require('crypto'),
    expect = require('expect.js'),
    utility = require('../'),
    kcrypto = utility.crypto;


// Test
describe('karmia-util', function () {
    describe('crypto', function () {
        it('Should get MD5 hash', function () {
            expect(kcrypto.hash('md5', 'Hello, world.', 'hex')).to.have.length(32);
        });

        it('Should get SHA1 hash', function () {
            expect(kcrypto.sha1('Hello, world.', 'hex')).to.have.length(40);
        });

        it('Should get SHA256 hash', function () {
            expect(kcrypto.sha256('Hello, world.', 'hex')).to.have.length(64);
        });

        it('Should get SHA512 hash', function () {
           expect(kcrypto.sha512('Hello, world.', 'hex')).to.have.length(128);
        });

        it('Should stretching hash', function () {
            const data = 'Hello, world.',
                sha512 = kcrypto.sha512(data, 'hex'),
                result = kcrypto.stretching('sha512', data, 10, 'hex');

            expect(result).to.not.be(sha512);
        });

        it('Should encrypt data', function () {
            const data = 'Hello, world.',
                password = 'password',
                result = kcrypto.encrypt('aes-256-ctr', password, data);

            expect(result).to.have.property('data');
        });

        it('Should decrypt data', function () {
            const algorithm = 'aes-256-ctr',
                data = 'Hello, world.',
                password = 'password',
                encrypted = kcrypto.encrypt(algorithm, password, data),
                result = kcrypto.decrypt(algorithm, password, encrypted);

            expect(result).to.be(data);
        });

        describe('Should encrypt data with iv' , function () {
            it('Mode: CBC', function () {
                const data = 'Hello, world.',
                    password = crypto.randomBytes(32),
                    iv = crypto.randomBytes(16),
                    result = kcrypto.encryptiv('aes-256-cbc', password, iv, data);

                expect(result).to.have.property('data');
            });

            it('Mode: GCM', function () {
                const data = 'Hello, world.',
                    password = crypto.randomBytes(32),
                    iv = crypto.randomBytes(12),
                    result = kcrypto.encryptiv('aes-256-gcm', password, iv, data);

                expect(result).to.have.property('data');
                expect(result).to.have.property('tag');
            });
        });

        describe('Should decrypt data with iv', function () {
            it('Mode: CBC', function () {
                const algorithm = 'aes-256-cbc',
                    data = 'Hello, world.',
                    password = crypto.randomBytes(32),
                    iv = crypto.randomBytes(16),
                    encrypted = kcrypto.encryptiv(algorithm, password, iv, data),
                    result = kcrypto.decryptiv(algorithm, password, iv, encrypted);

                expect(result).to.be(data);
            });

            it('Mode: GCM', function () {
                const algorithm = 'aes-256-gcm',
                    data = 'Hello, world.',
                    password = crypto.randomBytes(32),
                    iv = crypto.randomBytes(12),
                    encrypted = kcrypto.encryptiv(algorithm, password, iv, data),
                    result = kcrypto.decryptiv(algorithm, password, iv, encrypted);

                expect(result).to.be(data);
            });
        });
    });


});
