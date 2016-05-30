/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, stupid: true */
'use strict';



// Variables
const random = require('../../random');


/**
 * KarmiaUtilityCryptoIvMemory
 *
 * @class
 */
class KarmiaUtilityCryptoIvMemory {
    /**
     * Constructor
     *
     * @constructs KarmiaUtilityCryptoIvMemory
     */
    constructor(options) {
        const self = this;
        self.random = new random(options || {});
        self.counter = new Buffer.alloc(8);
        self.prefix = options.prefix || '';
    }

    /**
     * Get initial vector
     *
     * @param   {Function} callback
     * @returns {Promise}
     */
    get(callback) {
        const self = this,
            prefix = Buffer.from(self.prefix || self.random.string(4)),
            current = self.counter.readDoubleLE(),
            result = (Number.MAX_SAFE_INTEGER <= current) ? 0 : current + 1;
        self.counter.writeDoubleLE(result);
        if (!callback) {
            return Promise.resolve(Buffer.concat([prefix, self.counter], 12));
        }

        callback(null, Buffer.concat([prefix, self.counter], 12));
    }
}


// Export module
module.exports = KarmiaUtilityCryptoIvMemory;


/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
