'use strict';

/**
 * Return if and only if the provided value is undefined.
 *
 * @param {any} value - Value to be tested if undefined.
 */
var isUndefined = function(value) {
    return typeof value === 'undefined';
};

/**
 * Return if and only if the provided value is null.
 *
 * @param {any} value - Value to be tested if null.
 */
var isNull = function(value) {
    return typeof value === 'object' && !value;
};

/**
 * Return if the provided value is either null or undefined.
 * Returns false if: 0, false, NaN, {}, ""
 *
 * @param {any} value - Value to be tested if either null or undefined.
 */
var isNullsy = function(value) {
    return isUndefined(value) || isNull(value);
};

/**
 * Return if the provided value is neither null nor undefined.
 *
 * @param {any} value - Value to be tested if neither null nor undefined.
 */
var isValid = function(value) {
    return !isNullsy(value);
}

/**
 * Accepts object and return whether the key chain is valid.
 *
 * @param {object} testObj - Object to test validity.
 * @param {string} keys - All the keys needed to get to the desired key, joined by dot. (example: "path.to.key")
 */
var isValidChain = function (testObj, keys) {
    if ((typeof keys !== 'string') || (typeof testObj !== 'object') || isNullsy(testObj)) {
        return false;
    }

    var keysArray = keys.split('.');
    var firstElement = keysArray[0];

    if (isNullsy(firstElement) || isNullsy(testObj[firstElement])) {
        return false;
    }

    if (keysArray.length === 1) {
        return true;
    }

    return isValidChain(testObj[firstElement], keysArray.slice(1).join('.'));
}

module.exports = {
    isUndefined, isNull, isNullsy, isValid, isValidChain
};

module.exports.default = isValidChain;
