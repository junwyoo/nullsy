var defines = require('./defines');

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
 * Return if the provided value is falsey.
 * Returns true if: undefined, null, 0, false, NaN, "".
 * Note falsey values does NOT include empty object.
 *
 * @param {any} value - Value to be tested if falsey.
 */
var isFalsey = function(value) {
    return isNullsy(value) || defines.falseyValue.includes(value);
}

/**
 * Return if the value provided is an empty object.
 *
 * @param {any} value - Value to be tested if empty object.
 */
var isEmptyObject = function(value) {
    return !isFalsey(value) &&
        typeof value === 'object' &&
        Object.getOwnPropertyNames(value).length === 0 &&
        Object.getOwnPropertySymbols(value).length === 0 &&
        Object.getPrototypeOf(value) === Object.getPrototypeOf({});
}

/**
 * Return if the provided value is neither null nor undefined.
 *
 * @param {any} value - Value to be tested if neither null nor undefined.
 */
var isValid = function(value) {
    return !isNullsy(value);
}

module.exports = {
    isUndefined, isNull, isNullsy, isValid, isFalsey, isEmptyObject
};
