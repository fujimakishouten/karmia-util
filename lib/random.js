/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, stupid: true */
'use strict';



// Variables
const _ = require('lodash'),
    numbers = '0123456789',
    lower_characters = 'abcdefghijklmnopqrstuvwxyz',
    upper_characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    special_characters = '!"#$%&\'()*+,_./:;<=>?@[\\]^_`{|}~';


// Export module
module.exports = {

    /**
     * Generate random string
     *
     * @param   {number} length
     * @param   {Object} options
     * @returns {string}
     */
    string: function (length, options) {
        options = options || {};
        let haystack = '',
            result = '';

        if (options.number !== false) {
            haystack += _.isString(options.numbers) ? options.numbers : numbers;
        }

        if (options.lower !== false) {
            haystack += _.isString(options.lower) ? options.lower : lower_characters;
        }

        if (options.upper !== false) {
            haystack += _.isString(options.upper) ? options.upper : upper_characters;
        }

        if (options.special !== false) {
            haystack += _.isString(options.special) ? options.special : special_characters;
        }

        if (!haystack) {
            throw new Error('Empty haystack');
        }

        for (let i = 0; i < length; i = i + 1) {
            result = result + haystack[Math.floor(Math.random() * haystack.length)];
        }

        return result;
    }

};




/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
