function SubclassedError(msg) {
    this.message = msg;
    this.name = 'SubclassedError';
    const err = Error(msg); // http://es5.github.io/#x15.11.1
    this.stack = err.stack;
}

SubclassedError.prototype = Object.create(Error.prototype);
SubclassedError.prototype.constructor = SubclassedError;

var assert = require('chai').assert;
var util = require('util');

try {
	const err = new SubclassedError("Test");

	assert(err instanceof Error);
	assert(err instanceof SubclassedError);
	assert.equal(err.name, 'SubclassedError');
	assert(util.isError(err));
	// These would fail if you relied on Error.call(this, msg)
	assert.include(err.stack, __filename);
	assert.equal(err.message, 'Test');
	console.log("success!");
} catch (err) {
	console.log('err', err);
}
