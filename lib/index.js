/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint devel: true, node: true, nomen: true, stupid: true */
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
 * Export modules
 *
 * @param   {Object} options
 * @returns {Object}
 */
module.exports = function (options) {
    options = options || {};

    return Object.keys(modules).reduce(function (result, key) {
        result[key] = modules[key](options[key] || options);

        return result;
    }, {});
};




/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
