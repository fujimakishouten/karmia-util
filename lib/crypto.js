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
        encoding = encoding || 'binary';
        hash.update(buffer);

        return hash.digest(encoding);
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
        let result = buffer;
        count = count || 1;
        encoding = encoding || 'binary';

        for (let i = 0; i < count - 1; i = i + 1) {
            result = self.hash(algorithm, result, 'binary');
        }

        return self.hash(algorithm, result, encoding);
    },


    /**
     * Encrypt data without iv
     *
     * @param   {string} algorythm
     * @param   {Buffer} password
     * @param   {Buffer} buffer
     * @param   {string} encoding
     * @returns {Object}
     */
    encrypt: function (algorythm, password, buffer, encoding) {
        buffer = Buffer.isBuffer(buffer) ? buffer : new Buffer(buffer);
        encoding = encoding || 'binary';

        const cipher = crypto.createCipher(algorythm, password),
            encrypted = cipher.update(buffer, 'binary', encoding) + cipher.final('binary', encoding);

        return {data: encrypted};
    },


    /**
     * Decrypt data without iv
     *
     * @param   {string} algorythm
     * @param   {Buffer} password
     * @param   {Object} data
     * @param   {string} encoding
     * @returns {Buffer}
     */
    decrypt: function (algorythm, password, data, encoding) {
        data = _.isObject(data) ? data : {data: data};
        encoding = encoding || 'binary';

        const decipher = crypto.createDecipher(algorythm, password);

        return decipher.update(data.data, 'binary', encoding) + decipher.final('binary', encoding);
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
        buffer = Buffer.isBuffer(buffer) ? buffer : new Buffer(buffer);
        encoding = encoding || 'binary';

        const mode = algorythm.toLowerCase().substring(algorythm.length - 3),
            cipher = crypto.createCipheriv(algorythm, password, iv),
            encrypted = cipher.update(buffer, 'binary', encoding) + cipher.final('binary', encoding),
            result = {data: encrypted};

        if ('gcm' === mode) {
            result.tag = new Buffer(cipher.getAuthTag()).toString('base64');
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
     * @returns {Buffer}
     */
    decryptiv: function (algorythm, password, iv, data, encoding) {
        data = _.isObject(data) ? data : {data: data};
        encoding = encoding || 'binary';

        const mode = algorythm.toLowerCase().substring(algorythm.length -3),
            decipher = crypto.createDecipheriv(algorythm, password, iv);
        if ('gcm' === mode) {
            decipher.setAuthTag(Buffer.isBuffer(data.tag) ? data.tag : new Buffer(data.tag, 'base64'));
        }

        return decipher.update(data.data, 'binary', encoding) + decipher.final('binary', encoding);
    }
};




/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
