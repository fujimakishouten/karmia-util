/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint devel: true, node: true, nomen: true, stupid: true */
'use strict';



// Variables
const utilities = require('./lib');


/**
 * KarmiaUtility
 *
 * @class
 */
class KarmiaUtility {
    /**
     * Constructor
     *
     * @constructs KarmiaUtility
     */
    constructor(options) {
        const self = this;
        self.options = options || {};
        Object.keys(utilities).forEach(function (key) {
            self[key] = new utilities[key](self.options);
        });
    }
}


// Export module
module.exports = function (options) {
    options = options || {};

    return new KarmiaUtility(options);
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
