/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';
// Import modules
const KarmiaUtilityArray = require("karmia-utility-array");
const KarmiaUtilityCrypto = require("karmia-utility-crypto");
const KarmiaUtilityDate = require("karmia-utility-date");
const KarmiaUtilityObject = require("karmia-utility-object");
const KarmiaUtilityRandom = require("karmia-utility-random");
const KarmiaUtilityString = require("karmia-utility-string");
/**
 * KarmiaUtility
 *
 * @class
 */
class KarmiaUtility {
    /**
     * Constructor
     *
     * @param {Object} options
     * @constructs KarmiaUtility
     */
    constructor(options) {
        this.options = options || {};
        this.array = KarmiaUtilityArray;
        this.crypto = new KarmiaUtilityCrypto(this.options.crypto || this.options);
        this.date = new KarmiaUtilityDate(this.options.date || this.options);
        this.object = KarmiaUtilityObject;
        this.random = new KarmiaUtilityRandom(this.options.random || this.options);
        this.string = KarmiaUtilityString;
    }
}
module.exports = KarmiaUtility;
