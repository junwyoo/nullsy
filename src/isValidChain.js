var {isNullsy} = require('./basics');

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

// TODO: Add non-recursive implementation.

module.exports = isValidChain;
