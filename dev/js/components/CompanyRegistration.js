 import React, {Component} from 'react';

 export default class CompanyRegistration extends Component {
    constructor() {
        super();
        this.state = {
            CompanyName: '',
            CompanyAddress: '',
            CompanyEmail: '',
            CompanyPassword: '',
            CompanyPasswordCheck: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(name, e) {
        this.setState({[name]: e.target.value});
    }

    isValidEmail() {
        var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        return emailPattern.test(this.state.CompanyEmail);
    }

    isValidPassword() {
        var passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
        
        return passwordPattern.test(this.state.CompanyPassword);
    }

    passwordRepeatedCorrectly() {
        return this.state.CompanyPassword === this.state.CompanyPasswordCheck;
    }

    containsValue(str) {
        return !(str === "");
    }

   nameIsValid() {
        return this.containsValue(this.state.CompanyName);
    }
   
    addressIsValid() {
        return this.containsValue(this.state.CompanyAddress);
    }
   
    isSubmitable() {
        return this.addressIsValid() && this.nameIsValid() && this.passwordRepeatedCorrectly() && this.isValidPassword() && this.isValidEmail();
    }
   
    enableSubmitButton(){

    }
   
    onSubmit() {
        console.log('The button should be submittable' + this.isSubmitable());
    }

    formIsSubmitable() {

    }


    render() {
        return (
            <div>
                 <div className="form-header"> Company Registration Form </div>
                 <div>
                    <div className="form-input__heading">
                        Company Details
                    </div>
                    <div className="form-input__section">
                         <input id="CompanyEmail" type="email" name="CompanyEmail" placeholder="Email Address" className="form-input__value" onChange={(e) => this.handleChange("CompanyEmail", e)}/>
                     </div>
                       <div className="form-input__section">
                         <input id="CompanyPassword" type="password" name="CompanyPassword" placeholder="Password" className="form-input__value" onChange={(e) => this.handleChange("CompanyPassword", e)}/>
                     </div>
                     <div className="form-input__section">
                         <input id="CompanyPasswordCheck" type="password" name="CompanyPasswordCheck" placeholder="Password Verification" className="form-input__value" onChange={(e) => this.handleChange("CompanyPasswordCheck", e)}/>
                     </div>
                 </div>
                <button className="form__submit-button" onClick={this.onSubmit} disabled={this.isSubmitable}>Submit Company Details</button>               
            </div>
        );
    }
 }