function OfferModel(config) {
	this.config = config || {};

 	this.init();
}

var p = OfferModel.prototype;

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

export default OfferModel;