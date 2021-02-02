var assert = require('assert');
var {isUndefined, isNull, isNullsy, isValidChain} = require('../index');

// This test should alway pass unless there is a major change in js.
function nativeChecks() {
    // Basic null/undefined behaviors
    assert.strictEqual(null, null);
    assert.strictEqual(undefined, undefined);
    assert.strictEqual(!null, true);
    assert.strictEqual(!undefined, true);
    assert.strictEqual(typeof null, 'object');
    assert.strictEqual(typeof undefined, 'undefined');

    // Primitive negations
    assert.strictEqual(!'', true);
    assert.strictEqual(!"", true);
    assert.strictEqual(!NaN, true);
    assert.strictEqual(!0, true);
    assert.strictEqual(!{}, false);

    // Property read
    assert.throws(function () {undefined.illegal;});
    assert.throws(function () {null.illegal;});
    assert.doesNotThrow(function () {({}).legal;});

    // Fail fasts
    assert.strictEqual(null && undefined.illegal, null);
    assert.strictEqual(undefined && undefined.illegal, undefined);
    assert.strictEqual(false && undefined.illegal, false);
    assert.strictEqual(NaN && undefined.illegal, NaN);
    assert.strictEqual(0 && undefined.illegal, 0);
    assert.strictEqual(!{} && undefined.illegal, false);

    // Success fasts
    assert.strictEqual(!null || undefined.illegal, true);
    assert.strictEqual(!undefined || undefined.illegal, true);
    assert.strictEqual(!false || undefined.illegal, true);
    assert.strictEqual(!NaN || undefined.illegal, true);
    assert.strictEqual(!0 || undefined.illegal, true);
    assert.strictEqual(!!{} || undefined.illegal, true);
}

function isUndefinedTestCases() {
    assert.strictEqual(isUndefined(undefined), true);
    assert.strictEqual(isUndefined(), true);

    assert.strictEqual(isUndefined(null), false);
    assert.strictEqual(isUndefined(''), false);
    assert.strictEqual(isUndefined(""), false);
    assert.strictEqual(isUndefined(0), false);
    assert.strictEqual(isUndefined({}), false);
    assert.strictEqual(isUndefined(NaN), false);
    assert.strictEqual(isUndefined('undefined'), false);
}

function isNullTestCases() {
    assert.strictEqual(isNull(null), true);

    assert.strictEqual(isNull(), false);
    assert.strictEqual(isNull(undefined), false);
    assert.strictEqual(isNull(''), false);
    assert.strictEqual(isNull(""), false);
    assert.strictEqual(isNull(0), false);
    assert.strictEqual(isNull({}), false);
    assert.strictEqual(isNull(NaN), false);
    assert.strictEqual(isNull('undefined'), false);
}

function isNullsyTestCases() {
    assert.strictEqual(isNullsy(undefined), true);
    assert.strictEqual(isNullsy(), true);
    assert.strictEqual(isNullsy(null), true);

    assert.strictEqual(isNullsy(''), false);
    assert.strictEqual(isNullsy(""), false);
    assert.strictEqual(isNullsy(0), false);
    assert.strictEqual(isNullsy({}), false);
    assert.strictEqual(isNullsy(NaN), false);
    assert.strictEqual(isNullsy('undefined'), false);
}

function isValidChainTestCases() {
    var o = {
        path: {
            to: {
                myKey: 'exists',
                evenMore: {
                    myKey: 'innermost'
                },
                delusion: 'deluded'
            },
            side: {
                track: 'side tracked',
            },
            path: 'not this one'
        },
        to: 'not this one either'
    };

    assert.strictEqual(isValidChain(), false);
    assert.strictEqual(isValidChain(o), false);
    assert.strictEqual(isValidChain(o, {path:{to:{key: 'exists'}}}), false);
    assert.strictEqual(isValidChain('string:{}', 'path.to.myKey'), false);
    assert.strictEqual(isValidChain(undefined, 'path.to.myKey'), false);
    assert.strictEqual(isValidChain(null, 'path.to.myKey'), false);
    assert.strictEqual(isValidChain({}, ''), false);
    assert.strictEqual(isValidChain({}, 'path.to.myKey'), false);

    assert.strictEqual(isValidChain(o, 'path'), true);
    assert.strictEqual(isValidChain(o, 'path.to'), true);
    assert.strictEqual(isValidChain(o, 'path.to.myKey'), true);
    assert.strictEqual(isValidChain(o, 'myKey'), false);
    assert.strictEqual(isValidChain(o, 'to.myKey'), false);
    assert.strictEqual(isValidChain(o, 'path.myKey'), false);

    assert.strictEqual(isValidChain(o, 'path.to.evenMore'), true);
    assert.strictEqual(isValidChain(o, 'path.to.evenMore.myKey'), true);
    assert.strictEqual(isValidChain(o, 'path.to.delusion'), true);
    assert.strictEqual(isValidChain(o, 'path.to.evenMore.delusion'), false);

    assert.strictEqual(isValidChain(o, 'path.to.side'), false);
    assert.strictEqual(isValidChain(o, 'path.to.track'), false);
    assert.strictEqual(isValidChain(o, 'path.side.myKey'), false);
}

nativeChecks();
isNullTestCases();
isUndefinedTestCases();
isNullsyTestCases();
isValidChainTestCases();
