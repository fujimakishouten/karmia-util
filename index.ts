/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Import modules
import KarmiaUtilityArray from "karmia-utility-array";
import KarmiaUtilityCrypto from "karmia-utility-crypto";
import KarmiaUtilityDate from "karmia-utility-date";
import KarmiaUtilityObject from "karmia-utility-object";
import KarmiaUtilityRandom from "karmia-utility-random";
import KarmiaUtilityString from "karmia-utility-string";


/**
 * KarmiaUtility
 *
 * @class
 */
class KarmiaUtility {
    /**
     * Properties
     */
    public options: {[index: string]: any};

    public array: KarmiaUtilityArray;
    public crypto: KarmiaUtilityCrypto;
    public date: KarmiaUtilityDate;
    public object: KarmiaUtilityObject;
    public random: KarmiaUtilityRandom;
    public string: KarmiaUtilityString;

    /**
     * Constructor
     *
     * @param {Object} options
     * @constructs KarmiaUtility
     */
    constructor(options?: {[index: string]: any}) {
        this.options = options || {};

        this.array = KarmiaUtilityArray;
        this.crypto = new KarmiaUtilityCrypto(this.options.crypto || this.options);
        this.date = new KarmiaUtilityDate(this.options.date || this.options);
        this.object = KarmiaUtilityObject;
        this.random = new KarmiaUtilityRandom(this.options.random || this.options);
        this.string = KarmiaUtilityString;
    }
}


// Export module
export default KarmiaUtility;



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
