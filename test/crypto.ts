/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Import modules
import KarmiaUtility from "../";
import crypto = require("crypto");
import expect = require("expect.js");


// Variables
const utility = new KarmiaUtility();


// Test
describe('karmia-utility-crypto', function () {
    describe('hash', function () {
        it('Should get MD5 hash', function () {
            const result = utility.crypto.hash('md5', 'Hello, world.');

            expect(result).to.be.an(Buffer);
            expect(result.toString('hex')).to.have.length(32);
        });

        it('Should get SHA512/256 hash', function () {
            const result = utility.crypto.hash('sha512/256', 'Hello, world.');

            expect(result).to.be.an(Buffer);
            expect(result.toString('hex')).to.have.length(64);
        });
    });

    describe('sha1', function () {
        it('Should get SHA1 hash', function () {
            const result = utility.crypto.sha1('Hello, world.');

            expect(result).to.be.an(Buffer);
            expect(result.toString('hex')).to.have.length(40);
        });
    });

    describe('sha256', function () {
        it('Should get SHA256 hash', function () {
            const result = utility.crypto.sha256('Hello, world.');

            expect(result).to.be.an(Buffer);
            expect(result.toString('hex')).to.have.length(64);
        });
    });

    describe('sha512', function () {
        it('Should get SHA512 hash', function () {
            const result = utility.crypto.sha512('Hello, world.');

            expect(result).to.be.an(Buffer);
            expect(result.toString('hex')).to.have.length(128);
        });
    });

    describe('stretching', function () {
        it('Should stretching hash function', function () {
            const data = 'Hello, world.',
                sha512 = utility.crypto.sha512(data),
                result = utility.crypto.stretching('sha512', data, 10);

            expect(result).to.not.be(sha512);
        });
    });

    describe('hmac', function () {
        it('Should get MD5 HMAC digest', function () {
            const result = utility.crypto.hmac('md5', 'secret', 'Hello, world.');

            expect(result).to.be.an(Buffer);
            expect(result.toString('hex')).to.have.length(32);
        });
    });

    describe('hmac-sha1', function () {
        it('Should get SHA1 HMAC digest', function () {
            const result = utility.crypto.hmac_sha1('secret', 'Hello, world.');

            expect(result).to.be.an(Buffer);
            expect(result.toString('hex')).to.have.length(40);
        });
    });

    describe('hmac-sha256', function () {
        it('Should get SHA256 HMAC digest', function () {
            const result = utility.crypto.hmac_sha256('secret', 'Hello, world.');

            expect(result).to.be.an(Buffer);
            expect(result.toString('hex')).to.have.length(64);
        });
    });

    describe('hmac-sha512', function () {
        it('Should get SHA512 HMAC digest', function () {
            const result = utility.crypto.hmac_sha512('secret', 'Hello, world.');

            expect(result).to.be.an(Buffer);
            expect(result.toString('hex')).to.have.length(128);
        });
    });

    describe('encrypt', function () {
        it('Should encrypt data', function () {
            const data = 'Hello, world.',
                password = 'password',
                result = utility.crypto.encrypt('aes-256-cbc', password, data);

            expect(result).to.have.property('data');
        });
    });

    describe('Should decrypt data', function () {
        it('Should decrypt data', function () {
            const algorithm = 'aes-256-cbc',
                data = 'Hello, world.',
                password = 'password',
                encrypted = utility.crypto.encrypt(algorithm, password, data),
                result = utility.crypto.decrypt(algorithm, password, encrypted);

            expect(result.toString('utf-8')).to.be(data);
        });
    });

    describe('iv', function () {
        it('Should get iv', function () {
            const result = utility.crypto.iv();

            expect(result).to.be.a(Buffer);
            expect(result).to.have.length(12);
        });
    });

    describe('encryptiv', function () {
        describe('Should encrypt data with iv' , function () {
            it('Mode: CBC', function () {
                const data = 'Hello, world.',
                    password = crypto.randomBytes(32),
                    iv = crypto.randomBytes(16),
                    result = utility.crypto.encryptiv('aes-256-cbc', password, iv, data);

                expect(result).to.have.property('data');
            });

            it('Mode: GCM', function () {
                const data = 'Hello, world.',
                    password = crypto.randomBytes(32),
                    iv = crypto.randomBytes(12),
                    result = utility.crypto.encryptiv('aes-256-gcm', password, iv, data);

                expect(result).to.have.property('data');
                expect(result).to.have.property('tag');
            });
        });
    });

    describe('decryptiv', function () {
        describe('Should decrypt data with iv', function () {
            it('Mode: CBC', function () {
                const algorithm = 'aes-256-cbc',
                    data = 'Hello, world.',
                    password = crypto.randomBytes(32),
                    iv = crypto.randomBytes(16),
                    encrypted = utility.crypto.encryptiv(algorithm, password, iv, data),
                    result = utility.crypto.decryptiv(algorithm, password, iv, encrypted);

                expect(result.toString('utf-8')).to.be(data);
            });

            it('Mode: GCM', function () {
                const algorithm = 'aes-256-gcm',
                    data = 'Hello, world.',
                    password = crypto.randomBytes(32),
                    iv = crypto.randomBytes(12),
                    encrypted = utility.crypto.encryptiv(algorithm, password, iv, data),
                    result = utility.crypto.decryptiv(algorithm, password, iv, encrypted);

                expect(result.toString('utf-8')).to.be(data);
            });
        });
    });
});
