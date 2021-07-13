'use strict';

var {isUndefined, isNull, isNullsy, isValid, isFalsey, isEmptyObject} = require('./src/basics');
var isValidChain = require('./src/isValidChain');
var {isNullsyAny, isNullsyAll} = require('./src/recursives');
var {isTrue} = require('./src/combined');

module.exports = {
    isUndefined,
    isNull,
    isNullsy,
    isValid,
    isValidChain,
    isFalsey,
    isEmptyObject,
    isNullsyAny,
    isNullsyAll,
    isTrue
};
