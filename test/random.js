/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, nomen: true */
/*global describe, it */
'use strict';


// Variables
const expect = require('expect.js'),
    utility = require('../'),
    random = utility.random;


// Test
describe('karmia-util', function () {
    describe('random', function () {
        describe('Should get random string', function () {
            it('All characters', function () {
                expect(random.string(32)).to.have.length(32);
            });

            it('Only numbers', function () {
                const result = random.string(32, {
                    lower: false,
                    upper: false,
                    special: false
                });

                expect(result).to.match(/[0-9]{32}/);
            });

            it('Only lower characters', function () {
                const result = random.string(32, {
                    number: false,
                    upper: false,
                    special: false
                });

                expect(result).to.match(/[a-z]{32}/);
            });

            it('Only upper characters', function () {
                const result = random.string(32, {
                    number: false,
                    lower: false,
                    special: false
                });

                expect(result).to.match(/[A-Z]{32}/);
            });

            it('Only characters', function () {
                const result = random.string(32, {
                    number: false,
                    special: false
                });

                expect(result).to.match(/[A-z]{32}/);
            });

            it('Only special characters', function () {
                const result = random.string(32, {
                    number: false,
                    lower: false,
                    upper: false
                });

                expect(result).to.match(/[^A-z0-9]/);
            });

            it('Without characters', function () {
                expect(random.string(32, {special: false})).to.match(/[A-z0-9]{32}/);
            });
        });

        it('Should be error', function () {
            try {
                random.string(32, {
                    number: false,
                    lower: false,
                    upper: false,
                    special: false
                });
            } catch (e) {
                expect(e.message).to.be('Empty haystack');
            }
        });
    });
});
