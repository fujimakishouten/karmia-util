/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, nomen: true */
/*global describe, it */
'use strict';


// Variables
var expect = require('expect.js'),
    utility = require('../');


// Test
describe('karmia-util', function () {
    describe('date', function () {
        describe('configure', function () {
            it('Should configure date', function (done) {
                var date = new Date(2016, 0, 1, 0, 0, 0),
                    offset = 3 * 60 * 60 * 1000,
                    config = {date: date, offset: offset};
                utility.date.configure(config);

                expect(utility.date.offset).to.be(offset);
                expect(utility.date.date.getTime()).to.be(date.getTime());

                done();
            });
        });


        describe('getDate', function (){
            it('Should get date', function (done) {
                var date = new Date(2016, 0, 1, 0, 0, 0),
                    config = {date: date};
                utility.date.configure(config);

                expect(utility.date.getDate().getTime()).to.be(date.getTime());
                done();
            });
        });


        describe('getTime', function () {
            it('Should get time', function (done) {
                var date = new Date(2016, 0, 1, 0, 0, 0),
                    config = {date: date};
                utility.date.configure(config);

                expect(utility.date.getTime()).to.be(date.getTime());

                done();
            });
        });


        describe('getYMD', function () {
            it('Should get YMD at 02:59:59.999', function (done) {
                var date = new Date(2016, 0, 1, 2, 59, 59, 999),
                    offset = 3 * 60 * 60 * 1000,
                    config = {date: date, offset: offset};
                utility.date.configure(config);

                expect(utility.date.getYMD()).to.eql({year: 2015, month: 12, date: 31});

                done();
            });


            it('Should get YMD at 03:00:00.000', function (done) {
                var date = new Date(2016, 0, 1, 3, 0, 0, 0),
                    offset = 3 * 60 * 60 * 1000,
                    config = {date: date, offset: offset};
                utility.date.configure(config);

                expect(utility.date.getYMD()).to.eql({year: 2016, month: 1, date: 1});

                done();
            });
        });

        describe('format', function () {
            it('Should format date', function (done) {
                const now = new Date('2014-08-03 09:00:00'),
                    format = 'dDjlNSwz',
                    result = '03Sun3Sunday7rd0214';

                expect(utility.date.format(format, now)).to.be(result);

                done();
            });

            it('Should format week', function (done) {
                const now = new Date('2014-08-03 09:00:00'),
                    format = 'W',
                    result = '31';

                expect(utility.date.format(format, now)).to.be(result);

                done();
            });

            it('Should format month', function (done) {
                const now = new Date('2014-08-03 09:00:00'),
                    format = 'FmMnt',
                    result = 'August08Aug831';

                expect(utility.date.format(format, now)).to.be(result);

                done();
            });

            it('Should format year', function (done) {
                const now = new Date('2014-08-03 09:00:00'),
                    format = 'LoYy',
                    result = '02014201414';

                expect(utility.date.format(format, now)).to.be(result);

                done();
            });

            it('Should format time', function (done) {
                const now = new Date('2014-08-03 21:00:00'),
                    format = 'aAgGhHisu',
                    result = 'pmPM92109210000000000';

                expect(utility.date.format(format, now)).to.be(result);

                done();
            });

            it('Should format timezone', function (done) {
                const now = new Date('2014-08-03 09:00:00'),
                    format = 'OPTZ',
                    result = '+0900+09:00JST-540';

                expect(utility.date.format(format, now)).to.be(result);

                done();
            });

            it('Should format full date/time', function (done) {
                const now = new Date('2014-08-03 09:00:00'),
                    format = 'crU',
                    result = '2014-08-03T00:00:00.000ZSun, 03 Aug 2014 09:00:00 +09001407024000';

                expect(utility.date.format(format, now)).to.be(result);

                done();
            });

            it('Should format leap year', function (done) {
                expect(utility.date.format('L', new Date('2000-01-01 09:00:00'))).to.be('1');
                expect(utility.date.format('L', new Date('2001-01-01 09:00:00'))).to.be('0');
                expect(utility.date.format('L', new Date('2016-01-01 09:00:00'))).to.be('1');
                expect(utility.date.format('L', new Date('2100-01-01 09:00:00'))).to.be('0');

                done();
            });
        });
    });
});
