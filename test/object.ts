/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Import modules
import KarmiaUtility = require("../");
const expect = require("expect.js");


// Variables
const utility = new KarmiaUtility();



// Test
describe('karmia-utility-object', function () {
    describe('isObject', function () {
        describe('Should be object', function () {
            it('Object', function () {
                expect(utility.object.isObject({})).to.be(true);
            });

            it('Array', function () {
                expect(utility.object.isObject([])).to.be(true);
            });

            it('Function', function () {
                expect(utility.object.isObject(function () {})).to.be(true);
            });

            it('Generator', function () {
                expect(utility.object.isObject(function* () { return true; })).to.be(true);
            });
        });

        describe('Should not be object', function () {
            it('string', function () {
                expect(utility.object.isObject('a')).to.be(false);
            });

            it('number', function () {
                expect(utility.object.isObject(1.0)).to.be(false);
            });

            it('boolean', function () {
                expect(utility.object.isObject(true)).to.be(false);
            });
        });
    });

    describe('isPlainObject', function () {
        describe('Should be object', function () {
            it('Object', function () {
                expect(utility.object.isPlainObject({})).to.be(true);
            });
        });

        describe('Should not be object', function () {
            it('Array', function () {
                expect(utility.object.isPlainObject([])).to.be(false);
            });

            it('Function', function () {
                expect(utility.object.isPlainObject(function () {})).to.be(false);
            });

            it('Generator', function () {
                expect(utility.object.isPlainObject(function* () { return true; })).to.be(false);
            });

            it('string', function () {
                expect(utility.object.isPlainObject('a')).to.be(false);
            });

            it('number', function () {
                expect(utility.object.isPlainObject(1.0)).to.be(false);
            });

            it('boolean', function () {
                expect(utility.object.isPlainObject(true)).to.be(false);
            });
        });
    });

    describe('flip', function () {
        it('Should get object that exchanges key with their value', function () {
            const object = {a: 'A', b: 'B', c: 'C', d: 1, e: 2, f: 3} as {[index: string]: number|string},
                result = utility.object.flip(object) as {[index: string]: any};

            Object.keys(object).forEach(function (key) {
                expect(result[object[key]]).to.be(key);
            });
        });
    });

    describe('mergeProperties', function () {
        it('Should merge property', function () {
            const object1 = {
                    a: 'A',
                    b: {
                        c: 'C',
                        d: {
                            e: 'E',
                            f: {
                                g: 'G',
                                h: {
                                    i: 'I',
                                    j: {
                                        k: 'K',
                                        l: {
                                            m: 'M'
                                        },
                                        n: {
                                            o: 'O'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                object2 = {
                    b: {
                        d: {
                            f: {
                                g: 'G-2',
                                h: {
                                    j: {
                                        n: 'N',
                                        o: 'O',
                                        p: {
                                            q: 'Q'
                                        }
                                    }
                                }
                            },
                            r: 'R',
                            s: {
                                t: 'T'
                            }
                        }
                    },
                    u: 'U',
                    v: {
                        w: 'W'
                    }
                },
                result = utility.object.mergeProperties(object1, object2);

            expect(result).to.eql({
                a: 'A',
                b: {
                    c: 'C',
                    d: {
                        e: 'E',
                        f: {
                            g: 'G-2',
                            h: {
                                i: 'I',
                                j: {
                                    k: 'K',
                                    l: {
                                        m: 'M'
                                    },
                                    n: 'N',
                                    o: 'O',
                                    p: {
                                        q: 'Q'
                                    }
                                }
                            }
                        },
                        r: 'R',
                        s: {
                            t: 'T'
                        }
                    }
                },
                u: 'U',
                v: {
                    w: 'W'
                }
            });
        });
    });

    describe('removeProperty', function () {
        describe('Should remove property', function () {
            it('Should remove top level property', function () {
                const object = {a: 'A', b: 'B', c: 'C', d: 1, e: 2, f: 3},
                    result = utility.object.removeProperty(object, 'c');

                expect(result).to.have.keys(['a', 'b', 'd', 'e', 'f']);
                expect(result).to.not.have.key('c');
            });

            it('Should remove deep level property', function () {
                const object = {
                        a: {
                            b: {
                                c: {
                                    d: {
                                        e: {
                                            f: 'value'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    result = utility.object.removeProperty(object, 'e');

                expect(result).to.eql({
                    a: {
                        b: {
                            c: {
                                d: {}
                            }
                        }
                    }
                });
            });

            it('Should remove multi level properties', function () {
                const object = {
                        a: {
                            a: {
                                key: {}
                            }
                        },
                        b: {
                            b: {
                                b: {
                                    b: {
                                        key: {}
                                    }
                                }
                            }
                        }
                    },
                    result = utility.object.removeProperty(object, 'key');

                expect(result).to.eql({
                    a: {
                        a: {}
                    },
                    b: {
                        b: {
                            b: {
                                b: {}
                            }
                        }
                    }
                });
            });

            it('Should remove multi properties', function () {
                const object = {
                        a: {
                            a: {
                                a1: {}
                            }
                        },
                        b: {
                            b: {
                                b1: {}
                            }
                        }
                    },
                    result = utility.object.removeProperty(object, ['a1', 'b1']);

                expect(result).to.eql({
                    a: {
                        a: {}
                    },
                    b: {
                        b: {}
                    }
                });
            });
        });
    });
});
