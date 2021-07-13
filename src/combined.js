var {isValid} = require('./basics');

/**
 * Check if valid AND true.
 *
 * @param {any} value - Value to be tested if valid and true.
 */
 var isTrue = function(value) {
    return isValid(value) && value === true;
};

module.exports = {
    isTrue
};
