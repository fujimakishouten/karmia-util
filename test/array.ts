/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Import modules
import KarmiaUtility from "../";
import expect = require("expect.js");


// Variables
const utility = new KarmiaUtility();


// Test
describe('karmia-utility-array', function () {
    describe('unique', function () {
        it('Should get unique array', function () {
            const list = ['a', 'b', 'b', 'c', 'c', 'c', 'd', 'd', 'd', 'd', 'e', 'e', 'e', 'e', 'e'],
                result = utility.array.unique(list);

            expect(result).to.have.length(5);
            ['a', 'b', 'c', 'd', 'e'].forEach(function (item) {
                expect(result).to.contain(item);
            });
        });
    });

    describe('count', function () {
        it('Should count items', function () {
            const list = ['a', 'b', 'b', 'c', 'c', 'c', 'd', 'd', 'd', 'd', 'e', 'e', 'e', 'e', 'e'];

            expect(utility.array.count(list, 'a')).to.be(1);
            expect(utility.array.count(list, 'b')).to.be(2);
            expect(utility.array.count(list, 'c')).to.be(3);
            expect(utility.array.count(list, 'd')).to.be(4);
            expect(utility.array.count(list, 'e')).to.be(5);
            expect(utility.array.count(list, 'f')).to.be(0);
        });
    });

    describe('range', function () {
        describe('Should get array', function () {
            it('start is not specified', function () {
                const range = utility.array.range(10);
                for (let i = 0; i < 10; ++i) {
                    expect(range[i]).to.be(i);
                }
            });

            it('start and end specified', function () {
                const range = utility.array.range(10, 20);
                for (let i = 0; i < 10; ++i) {
                    expect(range[i]).to.be(i + 10);
                }
            });

            it('start, end and step specified', function () {
                const range = utility.array.range(10, 20, 3);
                for (let i = 0; i < 10; i = i + 3) {
                    expect(range[i / 3]).to.be(i + 10);
                }
            });
        });
    });

    describe('flip', function () {
        it('Should get object that exchanges index with their value', function () {
            const object = {a: 0, b: 1, c: 2, d: 3, e: 4},
                result = utility.array.flip(Object.keys(object));

            expect(result).to.be.an('object');
            expect(result).to.eql(utility.array.flip(Object.keys(object)));
        });
    });

    describe('intersection', function () {
        it('Should get intersection of two lists', function () {
            const list1 = ['a', 'b', 'b', 'c', 'c', 'c', 'd', 'd', 'd', 'd', 'e', 'e', 'e', 'e', 'e'],
                list2 = ['a', 'b', 'c'],
                result = utility.array.intersection(list1, list2);

            expect(result).to.have.length(3);
            ['a', 'b', 'c'].forEach(function (item) {
                expect(result).to.contain(item);
            });
        });
    });

    describe('difference', function () {
        it('Should get difference of two lists', function () {
            const list1 = ['a', 'b', 'b', 'c', 'c', 'c', 'd', 'd', 'd', 'd', 'e', 'e', 'e', 'e', 'e'],
                list2 = ['a', 'b', 'c'],
                result = utility.array.difference(list1, list2);

            expect(result).to.have.length(9);
            expect(utility.array.count(result, 'd')).to.be(4);
            expect(utility.array.count(result, 'e')).to.be(5);
        });
    });
});
