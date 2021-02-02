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

module.exports = {
    isUndefined, isNull, isNullsy, isValid
};
