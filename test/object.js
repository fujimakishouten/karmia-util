/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Variables
const expect = require('expect.js'),
    karmia_utility = require('../'),
    utility = new karmia_utility(),
    kobject = utility.object;


// Test
describe('karmia-utility-object', function () {
    describe('isObject', function () {
        describe('Should be object', function () {
            it('Object', function () {
                expect(kobject.isObject({})).to.be(true);
            });

            it('Array', function () {
                expect(kobject.isObject([])).to.be(true);
            });

            it('Function', function () {
                expect(kobject.isObject(function () {})).to.be(true);
            });

            it('Generator', function () {
                expect(kobject.isObject(function* () {})).to.be(true);
            });
        });

        describe('Should not be object', function () {
            it('string', function () {
                expect(kobject.isObject('a')).to.be(false);
            });

            it('number', function () {
                expect(kobject.isObject(1.0)).to.be(false);
            });

            it('boolean', function () {
                expect(kobject.isObject(true)).to.be(false);
            });
        });
    });

    describe('isPlainObject', function () {
        describe('Should be object', function () {
            it('Object', function () {
                expect(kobject.isPlainObject({})).to.be(true);
            });
        });

        describe('Should not be object', function () {
            it('Array', function () {
                expect(kobject.isPlainObject([])).to.be(false);
            });

            it('Function', function () {
                expect(kobject.isPlainObject(function () {})).to.be(false);
            });

            it('Generator', function () {
                expect(kobject.isPlainObject(function* () {})).to.be(false);
            });

            it('string', function () {
                expect(kobject.isPlainObject('a')).to.be(false);
            });

            it('number', function () {
                expect(kobject.isPlainObject(1.0)).to.be(false);
            });

            it('boolean', function () {
                expect(kobject.isPlainObject(true)).to.be(false);
            });
        });
    });

    describe('flip', function () {
        it('Should get object that exchanges key with their value', function () {
            const object = {a: 'A', b: 'B', c: 'C', d: 1, e: 2, f: 3},
                result = kobject.flip(object);

            Object.keys(object).forEach(function (key) {
                expect(result[object[key]]).to.be(key);
            });
        });
    });
});
