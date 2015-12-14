/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, stupid: true */
'use strict';



// Variables
const crypto = require('crypto'),
      util = require('util');


// Export module
module.exports = {

    /**
     * Calculate hash
     *
     * @param   {string} algorithm
     * @param   {string} string
     * @returns {string}
     */
    hash: function (algorithm, string) {
        const hash = crypto.createHash(algorithm);
        hash.update(string);

        return hash.digest('hex');
    },


    /**
     * Return SHA-256 hash
     *
     * @param   {string} string
     * @returns {string}
     */
    sha256: function (string) {
        const self = this;

        return self.hash('sha256', string);
    },


    /**
     * Return SHA-512 hash
     *
     * @param   {string} string
     * @returns {string}
     */
    sha512: function (string) {
        const self = this;

        return self.hash('sha512', string);
    },


    /**
     * Encrypt string
     *
     * @param   {string} algorithm
     * @param   {string} password
     * @param   {string} string
     * @returns {string}
     */
    encrypt: function (algorithm, password, string) {
        const cipher = crypto.createCipher(algorithm, password);

        return util.format('%s%s', cipher.update(string, 'utf8', 'hex'), cipher.final('hex'));
    },


    /**
     * Decrypt string
     *
     * @param   {string} algorithm
     * @param   {string} password
     * @param   {string} string
     * @returns {string}
     */
    decrypt: function (algorithm, password, string) {
        const decipher = crypto.createDecipher(algorithm, password);

        return util.format('%s%s', decipher.update(string, 'hex', 'utf8'), decipher.final('utf8'));
    },


    /**
     * Encrypt string
     *
     * @param {string} algorithm
     * @param {string} password
     * @param {string} iv
     * @param {string} string
     * @returns {string}
     */
    encryptIv: function (algorithm, password, iv, string) {
        const cipher = crypto.createCipheriv(algorithm, password, iv);

        return util.format('%s%s', cipher.update(string, 'utf8', 'hex'), cipher.final('hex'));
    },


    /**
     * Decrypt string
     *
     * @param   {string} algorithm
     * @param   {string} password
     * @param   {string} string
     * @param   {string} iv
     * @returns {string}
     */
    decryptIv: function (algorithm, password, iv, string) {
        const decipher = crypto.createDecipheriv(algorithm, password, iv);

        return util.format('%s%s', decipher.update(string, 'hex', 'utf8'), decipher.final('utf8'));
    }

};




/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
