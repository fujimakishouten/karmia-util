/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, stupid: true */
'use strict';



// Variables
const util = require('util'),
    _ = require('lodash'),
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


// Export module
module.exports = {

    /**
     * Configure date
     *
     * @param config
     */
    configure: function (config) {
        const self = this;
        config = config || {};

        self.offset = config.offset || 0;
        self.days = config.days || days;
        self.months = config.months || months;
        if (config.date) {
            self.date = _.isDate(config.date) ? config.date : new Date(config.date);
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
    },

    /**
     * Get formatted time string
     *
     * @param   {string} format
     * @param   {Date} date
     * @returns {string}
     */
    format(format, date) {
        const self = this;
        date = date || self.getDate();

        return _.map(format.split(''), function (value) {
            if ('d' === value) {
                return ('0' + date.getDate().toString()).slice(-2);
            } else if ('D' === value) {
                return self.days[date.getDay()].slice(0, 3);
            } else if ('j' === value) {
                return date.getDate();
            } else if ('l' === value) {
                return self.days[date.getDay()];
            } else if ('N' === value) {
                return (date.getDay() > 0) ? date.getDay() : 7;
            } else if ('S' === value) {
                return ['st', 'nd', 'rd'][date.getDate() - 1] || 'th';
            } else if ('w' === value) {
                return date.getDay();
            } else if ('z' === value) {
                return Math.floor((date - new Date(date.getFullYear(), 0, 1)) / (24 * 60 * 60 * 1000));
            } else if ('W' === value) {
                const week = Math.floor(Number(self.format('z', date)) / 7);

                return date.getDay() ? week : week + 1;
            } else if ('F' === value) {
                return self.months[date.getMonth()];
            } else if ('m' === value) {
                return ('0' + (date.getMonth() + 1).toString()).slice(-2);
            } else if ('M' === value) {
                return self.months[date.getMonth()].slice(0, 3);
            } else if ('n' === value) {
                return date.getMonth() + 1;
            } else if ('t' === value) {
                return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
            } else if ('L' === value) {
                return (29 === new Date(date.getFullYear(), 2, 0).getDate()) ? 1 : 0;
            } else if ('o' === value) {
                return date.toISOString().slice(0, 4);
            } else if ('Y' === value) {
                return date.getFullYear();
            } else if ('y' === value) {
                return date.getFullYear().toString().slice(-2);
            } else if ('a' === value) {
                return (date.getHours() > 12) ? 'pm' : 'am';
            } else if ('A' === value) {
                return (date.getHours() > 12) ? 'PM' : 'AM';
            } else if ('B' === value) {
                const offset = (date.getTimezoneOffset() + 60) * 60,
                    seconds = ((date.getHours() * 60 * 60) + (date.getMinutes() * 60) + date.getSeconds() + offset),
                    beat = (seconds / (24 * 60 * 60)) * 1000;

                return Math.floor((beat < 0) ? beat + 1000 : beat);
            } else if ('g' === value) {
                return (date.getHours() > 12) ? (date.getHours() - 12) : date.getHours();
            } else if ('G' === value) {
                return date.getHours();
            } else if ('h' === value) {
                return ('0' + ((date.getHours() > 12) ? (date.getHours() - 12) : date.getHours())).slice(-2);
            } else if ('H' === value) {
                return ('0' + date.getHours().toString()).slice(-2);
            } else if ('i' === value) {
                return ('0' + date.getMinutes().toString()).slice(-2);
            } else if ('s' === value) {
                return  ('0' + date.getSeconds().toString()).slice(-2);
            } else if ('u' === value) {
                return ('000000' + (date.getMilliseconds() * 1000).toString()).slice(-6);
            } else if ('O' === value) {
                return date.toString().split(' ')[5].slice(3);
            } else if ('P' === value) {
                const offset = date.toString().split(' ')[5].slice(3);
                return util.format('%s%s:%s', offset.slice(0, 1), offset.slice(1, 3), offset.slice(-2));
            } else if ('T' === value) {
                return date.toString().split(' ')[6].slice(1, -1);
            } else if ('Z' === value) {
                return date.getTimezoneOffset();
            } else if ('c' === value) {
                return date.toISOString();
            } else if ('r' === value) {
                return self.format('D, d M Y H:i:s O', date);
            } else if ('U' === value) {
                return date.getTime();
            } else {
                return value;
            }
        }).join('');
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
