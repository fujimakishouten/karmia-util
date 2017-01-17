/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Variables
const expect = require('expect.js'),
    karmia_utility = require('../'),
    utility = karmia_utility(),
    karray = utility.array;


// Test
describe('karmia-utility-array', function () {
    describe('unique', function () {
        it('Should get unique array', function () {
            const list = ['a', 'b', 'b', 'c', 'c', 'c', 'd', 'd', 'd', 'd', 'e', 'e', 'e', 'e', 'e'],
                result = karray.unique(list);

            expect(result).to.have.length(5);
            ['a', 'b', 'c', 'd', 'e'].forEach(function (item) {
                expect(result).to.contain(item);
            });
        });
    });

    describe('count', function () {
        it('Should count items', function () {
            const list = ['a', 'b', 'b', 'c', 'c', 'c', 'd', 'd', 'd', 'd', 'e', 'e', 'e', 'e', 'e'];

            expect(karray.count(list, 'a')).to.be(1);
            expect(karray.count(list, 'b')).to.be(2);
            expect(karray.count(list, 'c')).to.be(3);
            expect(karray.count(list, 'd')).to.be(4);
            expect(karray.count(list, 'e')).to.be(5);
            expect(karray.count(list, 'f')).to.be(0);
        });
    });

    describe('range', function () {
        describe('Should get array', function () {
            it('start is not specified', function () {
                const range = karray.range(10);
                for (let i = 0; i < 10; ++i) {
                    expect(range[i]).to.be(i);
                }
            });

            it('start and end specified', function () {
                const range = karray.range(10, 20);
                for (let i = 0; i < 10; ++i) {
                    expect(range[i]).to.be(i + 10);
                }
            });

            it('start, end and step specified', function () {
                const range = karray.range(10, 20, 3);
                for (let i = 0; i < 10; i = i + 3) {
                    expect(range[i / 3]).to.be(i + 10);
                }
            });
        });
    });

    describe('flip', function () {
        it('Should get object that exchanges index with their value', function () {
            const object = {a: 0, b: 1, c: 2, d: 3, e: 4},
                result = karray.flip(Object.keys(object));

            expect(result).to.be.an('object');
            expect(result).to.eql(karray.flip(Object.keys(object)));
        });
    });

    describe('intersection', function () {
        it('Should get intersection of two lists', function () {
            const list1 = ['a', 'b', 'b', 'c', 'c', 'c', 'd', 'd', 'd', 'd', 'e', 'e', 'e', 'e', 'e'],
                list2 = ['a', 'b', 'c'],
                result = karray.intersection(list1, list2);

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
                result = karray.difference(list1, list2);

            expect(result).to.have.length(9);
            expect(karray.count(result, 'd')).to.be(4);
            expect(karray.count(result, 'e')).to.be(5);
        });
    });
});
