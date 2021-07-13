var {isNullsy} = require('./basics');

/**
 * Check if any of the argument is nullsy.
 *
 * @param {...any} value - Values to be tested if nullsy.
 */
 var isNullsyAny = function() {
    for (var i = 0; i < arguments.length; i++) {
        if (isNullsy(arguments[i])) {
            return true;
        }
    }
    return false;
};

/**
 * Check if all of the argument is nullsy.
 *
 * @param {...any} value - Values to be tested if nullsy.
 */
 var isNullsyAll = function() {
    for (var i = 0; i < arguments.length; i++) {
        if (!isNullsy(arguments[i])) {
            return false;
        }
    }
    return true;
};

module.exports = {
    isNullsyAny,
    isNullsyAll
};
