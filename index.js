function HttpError(msg) {
    this.message = msg;
    this.name = 'HttpError';
    const err = Error(msg); // http://es5.github.io/#x15.11.1
    this.stack = err.stack;
}

HttpError.prototype = Object.create(Error.prototype);
HttpError.prototype.constructor = HttpError;

var assert = require('chai').assert;
var util = require('util');

try {
	const err = new HttpError("Test");

	assert(err instanceof Error);
	assert(err instanceof HttpError);
	assert.equal(err.name, 'HttpError');
	assert(util.isError(err));
	// These would fail if you relied on Error.call(this, msg)
	assert.include(err.stack, __filename);
	assert.equal(err.message, 'Test');
	console.log("success!");
} catch (err) {
	console.log('err', err);
}
