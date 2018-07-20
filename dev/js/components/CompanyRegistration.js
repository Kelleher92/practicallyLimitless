import React, {Component} from 'react';
import $ from 'jquery';
import { Redirect, withRouter } from 'react-router-dom';
import { isValidEmail, isValidPassword, isValidString } from '../helpers/utils.js';
import VerificationNotice from './VerificationNotice.js';
import PreLoaderBounce from './PreLoaderBounce.js';

class CompanyRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CompanyName: '',
            CompanyAddress: '',
            CompanyEmail: '',
            CompanyPassword: '',
            CompanyPasswordCheck: '',
            hasCheckedRegistration: false,
            isVerificationCheckComplete: false,
            wasRegistrationSuccessful: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
        this.fakeRegister = this.fakeRegister.bind(this);
    }

    handleChange(name, e) {
        this.setState({[name]: e.target.value});
    }

    passwordRepeatedCorrectly() {
        return this.state.CompanyPassword === this.state.CompanyPasswordCheck;
    }

    isValidName() {
        return isValidString(this.state.CompanyName);
    }
   
    isValidAddress() {
        return isValidString(this.state.CompanyAddress);
    }
   
    isSubmitable() {
        return this.isValidName() && this.isValidAddress() && this.passwordRepeatedCorrectly() && isValidPassword(this.state.CompanyPassword) && isValidEmail(this.state.CompanyEmail);
    }
   
    onSubmit() {
        // this.registerCompany();
        // this.navigateTo('/pl');
        this.fakeRegister();
    }

    onCancel() {
        this.navigateTo('/');
    }

    navigateTo(path) {
        let { history } = this.props;
        history.push(path);
    }

    registerCompany() {
        $.ajax({
            method: 'POST',
            data: {
                token: this.props.token,
                action: 'registerCompany',
                data: JSON.stringify({name: this.state.CompanyName, email: this.state.CompanyEmail, address: this.state.CompanyAddress, password: this.state.CompanyPassword})
            },
            url: 'public/process.php',
            success: function(res) {
                res = JSON.parse(res);
                console.log(res.message);
            },
            error: function(res) {
                console.log(res);
            }
        });
    }


    fakeRegister(){
        let me = this;

        // fake async registration check change for testing purposes
        me.setState({hasCheckedRegistration: true});
        setTimeout(function() { 
            me.setState({
                isVerificationCheckComplete: true,
                wasRegistrationSuccessful: false
            });
            
        }, 3000);
    }
    
    render() {
        return (
            <div>
                {this.state.hasCheckedRegistration ? (
                    this.state.isVerificationCheckComplete ? (
                        this.state.wasRegistrationSuccessful ? (
                            <VerificationNotice 
                                verificationStatus={true} 
                                title="success!" 
                                subTitle="Registration successful. Check your email!"
                                linkText="return home"
                                linkLocation="/home" />
                        ) : (
                            <VerificationNotice 
                                verificationStatus={false} 
                                title="error!" 
                                subTitle="There was an error processing your registration."
                                linkText="Try Again"
                                linkLocation="/company-registration" />
                        )
                    ) : (
                        <PreLoaderBounce />
                    )
                ) : (
                    <div>
                        <div className="form-header">Company Registration Form</div>
                        <div className="form-body">
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
                                    <button className="form__submit-button" onClick={this.onSubmit} disabled={!this.isSubmitable()}>Submit</button>
                                    <button className="form__cancel-button" onClick={this.onCancel}>Cancel</button> 
                            </div>    
                        </div>                       
                    </div>
                )}
            </div>
        )
    }
}

export default withRouter(CompanyRegistration);