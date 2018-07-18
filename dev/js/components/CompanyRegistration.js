 import React, {Component} from 'react';
 import $ from 'jquery';

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

        //this.registerCompany = this.registerCompany.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(name, e) {
        console.log('Changes are innn');
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
        return this.state.CompanyPassword == this.state.CompanyPasswordCheck;
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
   
    onSubmit() {
     this.registerCompany();
     //set fields as read only
        // loading icon for a couple of seconds
        //direct back to homepage
    }

    registerCompany(){
        $.ajax({
            method: 'POST',
            data: {
                token: this.props.token,
                action: 'registerCompany',
                data: JSON.stringify({name: this.state.CompanyName, email: this.state.CompanyEmail, address: this.state.CompanyAddress, password: this.state.CompanyPassword})
            },
            url: 'public/process.php',
            success: function(res) {
                console.log(res);
            },
            error: function(res) {
                console.log(res);
            }
        });
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
                         <input id="CompanyName" type="text" name="CompanyName" placeholder="Company Name" className="form-input__value" onChange={(e) => this.handleChange("CompanyName", e)}/>
                     </div>
                     <div className="form-input__section">
                         <input id="CompanyAddress" type="text" name="CompanyAddress" placeholder="Company Address" className="form-input__value" onChange={(e) => this.handleChange("CompanyAddress", e)}/>
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
                     <div className="form-submission__section">
                            <button className="form__submit-button" onClick={this.onSubmit} disabled={!this.isSubmitable()}> Submit </button> 
                            <button className="form__cancel-button" onClick={this.onCancel} disabled="false"> Cancel </button> 
                     </div>    
                 </div>
                          
            </div>
        );
    }
 }