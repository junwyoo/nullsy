var assert = require('assert');
var defines = require('../src/defines');
var {isUndefined, isNull, isNullsy, isValidChain, isFalsey, isEmptyObject} = require('../index');

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

    var exceptions = {
        path: {
            to: {
                validFalse: false,
                validNull: null,
                validUndefined: undefined
            }
        }
    }
    // The value of the path IS false
    // o.path.to.evenMore.validFalse = false
    assert.strictEqual(isValidChain(exceptions, 'path.to.validFalse'), true);
    assert.strictEqual(isValidChain(exceptions, 'path.to.validFalse.not'), false);

    // The value of the path is null
    // o.path.to.evenMore.validNull = null
    assert.strictEqual(isValidChain(exceptions, 'path.to.validNull'), true);
    assert.strictEqual(isValidChain(exceptions, 'path.to.validNull.not'), false);

    // The value of the path is undefined
    // o.path.to.evenMore.validUndefined = undefined
    assert.strictEqual(isValidChain(exceptions, 'path.to.validUndefined'), false);
    assert.strictEqual(isValidChain(exceptions, 'path.to.validUndefined.not'), false);
}

function isFalseyTestCases() {
    assert.strictEqual(isFalsey(), true);
    assert.strictEqual(isFalsey(null), true);
    assert.strictEqual(isFalsey(undefined), true);
    assert.strictEqual(isFalsey((() => {})()), true);

    // Tests [0, NaN, false, ""]
    defines.falseyValue.forEach(falsey => {
        assert.strictEqual(isFalsey(falsey), true);
    });

    assert.strictEqual(isFalsey(true), false);
    assert.strictEqual(isFalsey(1), false);
    assert.strictEqual(isFalsey(-1), false);
    assert.strictEqual(isFalsey({}), false);
    assert.strictEqual(isFalsey({some: 'object'}), false);
    assert.strictEqual(isFalsey([]), false);
    assert.strictEqual(isFalsey(defines.falseyValue), false);
    assert.strictEqual(isFalsey('string'), false);
    assert.strictEqual(isFalsey(() => {}), false);
}

function isEmptyObjectTestCases() {
    assert.strictEqual(isEmptyObject({}), true);

    assert.strictEqual(isEmptyObject([]), false);
    assert.strictEqual(isEmptyObject(), false);
    assert.strictEqual(isEmptyObject(0), false);
    assert.strictEqual(isEmptyObject(''), false);
    assert.strictEqual(isEmptyObject(), false);
    assert.strictEqual(isEmptyObject(undefined), false);
    assert.strictEqual(isEmptyObject(null), false);

    var o = {some: 'obj'};
    assert.strictEqual(isEmptyObject(o), false);

    delete o.some;
    assert.strictEqual(isEmptyObject(o), true);

    o[Symbol()] = 3;
    assert.strictEqual(isEmptyObject(o), false);

    o = {};
    assert.strictEqual(isEmptyObject({}), true);

    Object.defineProperties(o, {a: {enumerable: false, value: 3}});
    assert.strictEqual(isEmptyObject(o), false);

    // Prototype check
    function ParentClass() {}
    ParentClass.prototype.inheritedMethod = function() {};

    function ChildClass() {}
    ChildClass.prototype = new ParentClass;

    // This object does not have a property; only prototypes.
    var child = new ChildClass();

    assert.strictEqual(isEmptyObject(child), false);
    assert.strictEqual(isEmptyObject(Object.getPrototypeOf(child)), false);
    assert.strictEqual(isEmptyObject(Object.getPrototypeOf({})), false);
}

nativeChecks();
isNullTestCases();
isUndefinedTestCases();
isNullsyTestCases();
isValidChainTestCases();
isFalseyTestCases();
isEmptyObjectTestCases();
