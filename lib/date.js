/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, stupid: true */
'use strict';



// Variables
const _ = require('lodash');


// Export module
module.exports = {

    /**
     * Configure date
     *
     * @param config
     */
    configure: function (config) {
        const self = this,
            date = config.date || {};
        self.offset = date.offset || 0;
        if (date.date) {
            if (_.isDate(date.date)) {
                self.date = date.date;
            } else {
                self.date = new Date(date.date);
            }
        }
    },


    /**
     * Get current date object
     *
     * @returns {Date}
     */
    getDate: function () {
        const self = this;

        return self.date || new Date();
    },


    /**
     * Get current milliseconds
     *
     * @returns {number}
     */
    getTime: function () {
        const self = this;

        return (self.getDate().getTime());
    },


    /**
     * Get current Year/Month/Date object
     *
     * @returns {{year: number, month: number, date: number}}
     */
    getYMD: function () {
        const self = this,
            date = self.getDate(),
            current = new Date(date.getTime() - self.offset);

        return {
            year: current.getFullYear(),
            month: current.getMonth() + 1,
            date: current.getDate()
        };
    }

};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
