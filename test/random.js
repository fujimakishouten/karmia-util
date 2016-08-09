/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, nomen: true */
/*global describe, it */
'use strict';


// Variables
const expect = require('expect.js'),
    karmia_utility = require('../lib'),
    utility = karmia_utility(),
    krandom = utility.random;


// Test
describe('karmia-utility', function () {
    describe('random', function () {
        describe('string', function () {
            describe('Should get random string', function () {
                it('All characters', function () {
                    expect(krandom.string(32)).to.have.length(32);
                });

                it('Only numbers', function () {
                    const result = krandom.string(32, {
                        lower: false,
                        upper: false,
                        special: false
                    });

                    expect(result).to.match(/[0-9]{32}/);
                });

                it('Only lower characters', function () {
                    const result = krandom.string(32, {
                        number: false,
                        upper: false,
                        special: false
                    });

                    expect(result).to.match(/[a-z]{32}/);
                });

                it('Only upper characters', function () {
                    const result = krandom.string(32, {
                        number: false,
                        lower: false,
                        special: false
                    });

                    expect(result).to.match(/[A-Z]{32}/);
                });

                it('Only characters', function () {
                    const result = krandom.string(32, {
                        number: false,
                        special: false
                    });

                    expect(result).to.match(/[A-z]{32}/);
                });

                it('Only special characters', function () {
                    const result = krandom.string(32, {
                        number: false,
                        lower: false,
                        upper: false
                    });

                    expect(result).to.match(/[^A-z0-9]/);
                });

                it('Without characters', function () {
                    expect(krandom.string(32, {special: false})).to.match(/[A-z0-9]{32}/);
                });
            });

            it('Should be error', function () {
                try {
                    krandom.string(32, {
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

        describe('integer', function () {
            describe('Should get random integer', function () {
                it('No parameter specified', function () {
                    const result = krandom.integer();
                    expect(Number.isInteger(result)).to.be(true);
                    expect(result).to.greaterThan(-1);
                });

                it('Max specified', function () {
                    const min = 0,
                        max = 5,
                        result = krandom.integer(5);

                    expect(result).to.greaterThan(min - 1);
                    expect(result).to.lessThan(max + 1);
                });

                it('Max and min specified', function () {
                    const min = 5,
                        max = 10,
                        result = krandom.integer(max, min);
                    expect(result).to.greaterThan(min - 1);
                    expect(result).to.lessThan(max + 1);
                });
            });
        });
    });
});
