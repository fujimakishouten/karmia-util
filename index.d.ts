import KarmiaUtilityArray from "karmia-utility-array";
import KarmiaUtilityCrypto from "karmia-utility-crypto";
import KarmiaUtilityDate from "karmia-utility-date";
import KarmiaUtilityObject from "karmia-utility-object";
import KarmiaUtilityRandom from "karmia-utility-random";
import KarmiaUtilityString from "karmia-utility-string";

declare module KarmiaUtility {
    export class KarmiaUtility {
        array: KarmiaUtilityArray;
        crypto: KarmiaUtilityCrypto;
        date: KarmiaUtilityDate;
        object: KarmiaUtilityObject;
        random: KarmiaUtilityRandom;
        string: KarmiaUtilityString;

        constructor(options: Object|null|undefined);
    }
}
