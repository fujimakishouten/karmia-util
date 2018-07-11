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
import KarmiaUtilitySequence from "karmia-utility-sequence";
import {
    KarmiaUtilitySequenceAdapterNumber,
    KarmiaUtilitySequenceAdapterTime
} from "karmia-utility-sequence";


// Export modulesee
export {
    KarmiaUtilitySequenceAdapter,
    KarmiaUtilitySequenceAdapterNumber,
    KarmiaUtilitySequenceAdapterTime
} from "karmia-utility-sequence";


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

    public crypto: KarmiaUtilityCrypto;
    public date: KarmiaUtilityDate;
    public random: KarmiaUtilityRandom;
    public array = KarmiaUtilityArray;
    public object = KarmiaUtilityObject;
    public string = KarmiaUtilityString;
    public sequence = KarmiaUtilitySequence;
    public sequence_adapter: {[index: string]: any} = {};

    /**
     * Constructor
     *
     * @param {Object} options
     * @constructs KarmiaUtility
     */
    constructor(options?: {[index: string]: any}) {
        this.options = options || {};

        this.crypto = new KarmiaUtilityCrypto(this.options.crypto || this.options);
        this.date = new KarmiaUtilityDate(this.options.date || this.options);
        this.random = new KarmiaUtilityRandom(this.options.random || this.options);
        this.sequence_adapter = {
            number: KarmiaUtilitySequenceAdapterNumber,
            time: KarmiaUtilitySequenceAdapterTime
        }
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
