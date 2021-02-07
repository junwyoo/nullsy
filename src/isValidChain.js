var {isNullsy, isUndefined} = require('./basics');

/**
 * Accepts object and return whether the key chain is valid.
 *
 * @param {object} testObj - Object to test validity.
 * @param {string} keys - All the keys needed to get to the desired key, joined by dot. (example: "path.to.key")
 */
var isValidChain = function (testObj, keys) {
    if (typeof keys !== 'string' || typeof testObj !== 'object' || isNullsy(testObj)) {
        return false;
    }
    var keysArray = keys.split('.');
    var redFlag = false;
    var lastValue = keysArray.reduce((accObj, cur) => {
        if (redFlag) {
            return;
        }

        if (typeof accObj[cur] !== 'object' || isNullsy(accObj[cur])) {
            redFlag = true;
            return accObj[cur];
        }

        return accObj[cur];
    }, testObj);

    // If encountered nullsy value and it was not the last value. (Or undefined. See README.md)
    if (redFlag && isUndefined(lastValue)) {
        return false;
    }

    // Path is valid and the last value is anything but "undefined".
    return true;
}

module.exports = isValidChain;
