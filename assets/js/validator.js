import m from 'mithril';

/**
 * Factory method for creating new input validators
 * @param {HTMLInputElement} input
 */
export const validate = (input) => {
	if (!(input instanceof HTMLInputElement)) {
		throw new TypeError('Element must be an input');
	}

	const inputType = input.getAttribute('type');
	let validator;

	switch (inputType) {
		case 'checkbox':
		case 'radio':
			validator = new CheckableInputValidator(input);
			break;
		case 'text':
			validator = new TextInputValidator(input);
			break;
		case 'color':
		case 'email':
		case 'month':
		case 'number':
		case 'password':
		case 'search':
		case 'tel':
			validator = new NativeValidator(input);
			break;
		default:
			throw new TypeError('Unsupported input type');
	}

	return validator;
};

/**
 * Base validator class
 */
class InputValidator {

	/**
	 *
	 * @param {HTMLInputElement} input
	 */
	constructor(input) {
		this.input = input;
	}

	/**
	 * Basic assertion
	 * @param {boolean} assertion
	 * @param {function} callback
	 * @returns {this}
	 */
	with(assertion, callback) {
		if (!assertion) callback.call(this.input);

		return this;
	}

	/**
	 * Assert compliance to some external pattern.
	 * Sends a POST request to the specified URL of the following format:
	 * { type: [INPUT_TYPE], value: [INPUT_VALUE] }
	 * @param {string} url
	 */
	withXhrCall(url) {
		return m.request({
			method: 'POST',
			url: url,
			data: {
				type: this.input.getAttribute('type'),
				value: this.input.value,
			},
		}).then(data => !!data);
	}
}

/**
 * Validator for plain text inputs
 */
class TextInputValidator extends EditableMixin(InputValidator) {}

/**
 * Validator for inputs that can be validated by the browser itself
 */
class NativeValidator extends EditableMixin(InputValidator) {
	natively(callback) {
		return super.with(this.input.validity.valid, callback);
	}
}

/**
 * Validator for fields that can be checked by clicking on them
 */
class CheckableInputValidator extends InputValidator {
	checked(callback, forceChecked = true) {
		return super.with(this.input.checked && forceChecked, callback);
	}
}

/**
 * Common validation method for editable text inputs
 */
const EditableMixin = superclass => class extends superclass {
	blank(callback, forceBlank = false) {
		const regex = forceBlank ? /.*/ : /\s*/;
		return super.with(regex.test(this.input.value), callback);
	}
};