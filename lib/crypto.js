/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, stupid: true */
'use strict';



// Variables
const crypto = require('crypto'),
    _ = require('lodash');


// Export module
module.exports = {

    /**
     * Calculate hash
     *
     * @param   {string} algorithm
     * @param   {Buffer} buffer
     * @param   {string} encoding
     * @returns {string}
     */
    hash: function (algorithm, buffer, encoding) {
        const hash = crypto.createHash(algorithm);
        buffer = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer, encoding);
        hash.update(buffer);

        return hash.digest();
    },


    /**
     * Return SHA-256 hash
     *
     * @param   {string} buffer
     * @param   {string} encoding
     * @returns {string}
     */
    sha1: function (buffer, encoding) {
        const self = this;

        return self.hash('sha1', buffer, encoding);
    },


    /**
     * Return SHA-256 hash
     *
     * @param   {string} buffer
     * @param   {string} encoding
     * @returns {string}
     */
    sha256: function (buffer, encoding) {
        const self = this;

        return self.hash('sha256', buffer, encoding);
    },


    /**
     * Return SHA-512 hash
     *
     * @param   {string} buffer
     * @param   {string} encoding
     * @returns {string}
     */
    sha512: function (buffer, encoding) {
        const self = this;

        return self.hash('sha512', buffer, encoding);
    },

    /**
     * Stretching hash
     *
     * @param   {string} algorithm
     * @param   {Buffer} buffer
     * @param   {Number} count
     * @param   {string} encoding
     * @returns {string}
     */
    stretching: function (algorithm, buffer, count, encoding) {
        if (_.isString(count)) {
            encoding = count;
            count = 1;
        }

        const self = this;
        let result = self.hash(algorithm, buffer, encoding);
        count = count || 1;

        for (let i = 1; i < count - 1; i = i + 1) {
            result = self.hash(algorithm, result);
        }

        return self.hash(algorithm, result);
    },

    /**
     * Calculate HMAC digest
     *
     * @param {string} algorithm
     * @param {Buffer} password
     * @param {Buffer} buffer
     * @param {string} encoding
     * @returns {*}
     */
    hmac: function (algorithm, password, buffer, encoding) {
        const secret = Buffer.isBuffer(password) ? password : Buffer.from(password, 'binary'),
            hmac = crypto.createHmac(algorithm, secret);
        buffer = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer, encoding);
        hmac.update(buffer);

        return hmac.digest();
    },


    /**
     * Return HMAC-SHA256 Digest
     *
     * @param {string} secret
     * @param {Buffer} buffer
     * @param {string} encoding
     * @returns {*}
     */
    hmac_sha1: function (secret, buffer, encoding) {
        const self = this;

        return self.hmac('sha1', secret, buffer, encoding);
    },


    /**
     * Return HMAC-SHA256 Digest
     *
     * @param {string} secret
     * @param {Buffer} buffer
     * @param {string} encoding
     * @returns {*}
     */
    hmac_sha256: function (secret, buffer, encoding) {
        const self = this;

        return self.hmac('sha256', secret, buffer, encoding);
    },


    /**
     * Return HMAC-SHA512 Digest
     *
     * @param {string} secret
     * @param {Buffer} buffer
     * @param {string} encoding
     * @returns {*}
     */
    hmac_sha512: function (secret, buffer, encoding) {
        const self = this;

        return self.hmac('sha512', secret, buffer, encoding);
    },


    /**
     * Encrypt data without iv
     *
     * @param   {string} algorythm
     * @param   {Buffer} password
     * @param   {Buffer} data
     * @param   {string} encoding
     * @returns {Object}
     */
    encrypt: function (algorythm, password, data, encoding) {
        const result = {},
            secret = Buffer.isBuffer(password) ? password : Buffer.from(password, 'binary'),
            cipher = crypto.createCipher(algorythm, secret),
            buffer = Buffer.isBuffer(data) ? data : Buffer.from(data, encoding),
            encrypted = cipher.update(buffer, encoding, 'binary') + cipher.final('binary');
        result.data =  Buffer.from(encrypted, 'binary');

        return result;
    },


    /**
     * Decrypt data without iv
     *
     * @param   {string} algorythm
     * @param   {Buffer} password
     * @param   {Object} buffer
     * @param   {string} encoding
     * @returns {Buffer}
     */
    decrypt: function (algorythm, password, buffer, encoding) {
        const secret = Buffer.isBuffer(password) ? password : Buffer.from(password, 'binary'),
            decipher = crypto.createDecipher(algorythm, secret),
            encrypted = _.has(buffer, 'data') ? buffer.data : buffer,
            data = _.isBuffer(encrypted) ? encrypted : Buffer.from(encrypted, encoding);

        return Buffer.from(decipher.update(data, encoding, 'binary') + decipher.final('binary'), 'binary');
    },


    /**
     * Encrypt data with iv
     *
     * @param   {string} algorythm
     * @param   {Buffer} password
     * @param   {Buffer} iv
     * @param   {Buffer} buffer
     * @param   {string} encoding
     * @returns {Object}
     */
    encryptiv: function (algorythm, password, iv, buffer, encoding) {
        const result = {},
            mode = algorythm.toLowerCase().substring(algorythm.length - 3),
            secret = Buffer.isBuffer(password) ? password : Buffer.from(password, 'binary'),
            vector = Buffer.isBuffer(iv) ? iv : Buffer.from(iv, 'binary'),
            cipher = crypto.createCipheriv(algorythm, secret, vector),
            data = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer, encoding),
            encrypted = cipher.update(data, encoding, 'binary') + cipher.final('binary');
        result.data = Buffer.from(encrypted, 'binary');
        if ('gcm' === mode) {
            result.tag = cipher.getAuthTag();
            result.tag = (encoding) ? result.tag.toString(encoding) : result.tag;
        }

        return result;
    },


    /**
     * Decrypt data with iv
     *
     * @param   {string} algorythm
     * @param   {Buffer} password
     * @param   {Buffer} iv
     * @param   {Object} data
     * @param   {string} encoding
     * @param   {string} tag_encoding
     * @returns {Buffer}
     */
    decryptiv: function (algorythm, password, iv, data, encoding, tag_encoding) {
        const mode = algorythm.toLowerCase().substring(algorythm.length -3),
            secret = Buffer.isBuffer(password) ? password : Buffer.from(password, 'binary'),
            decipher = crypto.createDecipheriv(algorythm, secret, iv),
            encrypted = _.has(data, 'data') ? data.data : data,
            buffer = _.isBuffer(encrypted) ? encrypted : Buffer.from(encrypted, encoding);
        if ('gcm' === mode) {
            decipher.setAuthTag(Buffer.isBuffer(data.tag) ? data.tag : Buffer.from(data.tag, tag_encoding));
        }

        return Buffer.from(decipher.update(buffer, encoding, 'binary') + decipher.final('binary'), 'binary');
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
