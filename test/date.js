/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, nomen: true */
/*global describe, it */
'use strict';


// Variables
var expect = require('expect.js'),
    kutil = require('../');


// Test
describe('karmia-util', function () {
    describe('date', function () {
        describe('configure', function () {
            it('Should configure date', function (done) {
                var date = new Date(2016, 0, 1, 0, 0, 0),
                    offset = 3 * 60 * 60 * 1000,
                    config = {date: {date: date, offset: offset}};
                kutil.date.configure(config);

                expect(kutil.date.offset).to.be(offset);
                expect(kutil.date.date.getTime()).to.be(date.getTime());

                done();
            });
        });


        describe('getDate', function (){
            it('Should get date', function (done) {
                var date = new Date(2016, 0, 1, 0, 0, 0),
                    config = {date: {date: date}};
                kutil.date.configure(config);

                expect(kutil.date.getDate().getTime()).to.be(date.getTime());
                done();
            });
        });


        describe('getTime', function () {
            it('Should get time', function (done) {
                var date = new Date(2016, 0, 1, 0, 0, 0),
                    config = {date: {date: date}};
                kutil.date.configure(config);

                expect(kutil.date.getTime()).to.be(date.getTime());

                done();
            });
        });


        describe('getYMD', function () {
            it('Should get YMD at 02:59:59.999', function (done) {
                var date = new Date(2016, 0, 1, 2, 59, 59, 999),
                    offset = 3 * 60 * 60 * 1000,
                    config = {date: {date: date, offset: offset}};
                kutil.date.configure(config);

                expect(kutil.date.getYMD()).to.eql({year: 2015, month: 12, date: 31});

                done();
            });


            it('Should get YMD at 03:00:00.000', function (done) {
                var date = new Date(2016, 0, 1, 3, 0, 0, 0),
                    offset = 3 * 60 * 60 * 1000,
                    config = {date: {date: date, offset: offset}};
                kutil.date.configure(config);

                expect(kutil.date.getYMD()).to.eql({year: 2016, month: 1, date: 1});

                done();
            });
        });
    });
});
