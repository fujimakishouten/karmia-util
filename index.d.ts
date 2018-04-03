import KarmiaUtilityArray = require('karmia-utility-array');
import KarmiaUtilityCrypto = require('karmia-utility-crypto');
import KarmiaUtilityDate = require('karmia-utility-date');
import KarmiaUtilityObject = require('karmia-utility-object');
import KarmiaUtilityRandom = require('karmia-utility-random');
import KarmiaUtilityString = require('karmia-utility-string');

declare class KarmiaUtility {
    array: KarmiaUtilityArray;
    crypto: KarmiaUtilityCrypto;
    date: KarmiaUtilityDate;
    object: KarmiaUtilityObject;
    random: KarmiaUtilityRandom;
    string: KarmiaUtilityString;
}

export = KarmiaUtility;
