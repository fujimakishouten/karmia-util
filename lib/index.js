/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Variables
const fs = require('fs'),
    path = require('path'),
    meta = require('../package.json'),
    modules = {};

// Require modules
Object.keys(meta.dependencies).filter(function (key) {
    return ('karmia-utility-' === key.substring(0, 15));
}).forEach(function (module) {
    modules[module.substring(15)] = require(module);
});

fs.readdirSync(__dirname).forEach(function (filename) {
    if ('index.js' === filename) {
        return;
    }

    const extension = path.extname(filename),
        name = filename.replace(extension, '');

    modules[name] = require(path.join(__dirname, name));
});


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
        const self = this;
        self.options = options || {};

        Object.keys(modules).forEach(function (key) {
            self[key] = modules[key](options[key] || options);
        });
    }
}


/**
 * Export modules
 *
 * @param   {Object} options
 * @returns {Object}
 */
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
