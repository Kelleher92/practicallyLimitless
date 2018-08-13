import { isValidEmail, isValidPassword, isValidString } from '../helpers/utils.js';

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
		confirmPassword: null
	}
}

p.initData = function() {
	this.data = this.config.data || {};
}

p.setData = function(input) {
	this.data = input;
}

p.isPasswordConfirmValid = function() {
    return this.data.password === this.data.confirmPassword;
}

p.isValidName = function() {
    return isValidString(this.data.name);
}
   
p.isValidAddress = function() {
    return isValidString(this.data.address);
}
   
p.isSubmitable = function() {
    return this.isValidName() && this.isValidAddress() && isValidEmail(this.data.email) && isValidPassword(this.data.password) && this.isPasswordConfirmValid();
}

p.registrationData = function() {
	return JSON.stringify({name: this.data.name, email: this.data.email, address: this.data.address, password: this.data.password})
}

export default AuthenticationModel;