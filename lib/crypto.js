/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, stupid: true */
'use strict';



// Variables
const crypto = require('crypto');


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
        encoding = encoding || 'hex';
        hash.update(buffer);

        return hash.digest(encoding);
    },


    /**
     * Return SHA-256 hash
     *
     * @param   {string} buffer
     * @returns {string}
     */
    sha256: function (buffer) {
        const self = this;

        return self.hash('sha256', buffer);
    },


    /**
     * Return SHA-512 hash
     *
     * @param   {string} buffer
     * @returns {string}
     */
    sha512: function (buffer) {
        const self = this;

        return self.hash('sha512', buffer);
    },


    /**
     * Encrypt string
     *
     * @param   {string} algorithm
     * @param   {string} password
     * @param   {Buffer} buffer
     * @returns {string}
     */
    encrypt: function (algorithm, password, buffer) {
        const cipher = crypto.createCipher(algorithm, password);

        return Buffer.concat([cipher.update(buffer), cipher.final()]);
    },


    /**
     * Decrypt string
     *
     * @param   {string} algorithm
     * @param   {string} password
     * @param   {Buffer} buffer
     * @returns {string}
     */
    decrypt: function (algorithm, password, buffer) {
        const decipher = crypto.createDecipher(algorithm, password);

        return Buffer.concat([decipher.update(buffer) , decipher.final()]);
    }

};




/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
