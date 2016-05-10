/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, stupid: true */
'use strict';



// Variables
const util = require('util'),
    _ = require('lodash');


// Export module
module.exports = {

    /**
     * Trim string
     *
     * @param   {string} string
     * @param   {string} mask_characters
     * @returns {string}
     */
    trim: function (string, mask_characters) {
        mask_characters = mask_characters || ' \t\n\r\0\x0B';

        return string.replace(new RegExp(util.format('^[%s]+|[%s]+$', mask_characters, mask_characters), 'g'), '');
    },

    /**
     * Trim left string
     *
     * @param   {string} string
     * @param   {string} mask_characters
     * @returns {string}
     */
    ltrim: function (string, mask_characters) {
        mask_characters = mask_characters || ' \t\n\r\0\x0B';

        return string.replace(new RegExp(util.format('^[%s]+', mask_characters), 'g'), '');
    },

    /**
     * Trim right string
     *
     * @param   {string} string
     * @param   {string} mask_characters
     * @returns {string}
     */
    rtrim: function (string, mask_characters) {
        mask_characters = mask_characters || ' \t\n\r\0\x0B';

        return string.replace(new RegExp(util.format('[%s]+?$', mask_characters), 'g'), '');
    },

    /**
     * Unquote string
     *
     * @param   {string} string
     * @returns {string}
     */
    unquote: function (string) {
        const first = string.charAt(0),
            last = string.charAt(string.length - 1);
        if (('"' === first && '"' === last) || ("'" === first && "'" === last)) {
            return string.substring(1, string.length - 1);
        }

        return string;
    },


    /**
     * Parse "key1=value1, key2=value2" formatted string
     *
     * @param   {string} string
     * @param   {string|regexp} delimiter
     * @param   {string|regexp} separator
     * @returns {Object}
     */
    parse: function (string, delimiter, separator) {
        const self = this;
        delimiter = delimiter || /,? /;
        separator = separator || '=';

        return _.reduce(string.split(delimiter), function (result, value) {
            const data = value.split(separator, 2),
                key = self.unquote(data[0]);
            result[key] = (data[1]) ? self.unquote(data[1]) : key;

            return result;
        }, {});
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
