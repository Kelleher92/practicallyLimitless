import { isValidEmail, isValidPassword, doPasswordsMatch, areAllFieldsComplete } from '../helpers/utils.js';

function AuthenticationModel(config) {
	this.config = config || {};

 	// this.brain.subscribe('selectionUpdate', this.modifySelection, this);
	// this.brain.publish('selectionUpdate');

 	this.init();
}

var p = AuthenticationModel.prototype;

p.init = function() {
	this.clearData();
	this.initData();
}

p.clearData = function() {
	this.data = {
		name: null,
		email: null,
		address: null,
		password: null,
		confirmPassword: null,
		geoCoor: null
	}
}

p.initData = function() {
	this.data = this.config.data || {};
}

p.setData = function(input) {
	this.data = input;
}

p.isPasswordConfirmValid = function() {
    return doPasswordsMatch(this.data.password, this.data.confirmPassword);
}
   
p.allFieldsComplete = function() {
    return areAllFieldsComplete([this.data.name, this.data.address, this.data.email, this.data.password, this.data.confirmPassword]);
}
   
p.isSubmitable = function() {
    return this.allFieldsComplete() && isValidEmail(this.data.email) && isValidPassword(this.data.password) && this.isPasswordConfirmValid();
}

p.registrationData = function() {
	return JSON.stringify({name: this.data.name, email: this.data.email, address: this.data.address, password: this.data.password, geoCoor: this.data.geoCoor})
}

export default AuthenticationModel;