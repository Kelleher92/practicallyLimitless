import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import VerificationNotice from './VerificationNotice.js';
import PreLoader from './PreLoader.js';
import $ from 'jquery';
import AuthenticationModel from '../models/authentication.model.js';

class CompanyRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            email: '',
            password: '',
            confirmPassword: '',
            hasStartedRegistrationCheck: false,
            isVerificationCheckComplete: false,
            wasRegistrationSuccessful: false
        };

        this.onClickLogin = this.onClickLogin.bind(this);
        this.onClickMapChoice = this.onClickMapChoice.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
        this.onClickSubmit = this.onClickSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.authenticationModel = new AuthenticationModel();
    }

    handleChange(name, e) {
        this.setState({[name]: e.target.value});
    }
   
    onClickLogin() {
        this.navigateTo('/company-login');
    }

    navigateTo(path) {
        let { history } = this.props;
        history.push(path);
    }

    onClickMapChoice() {
        this.navigateTo('/location-map');
    }

    handleKeyPress(target) {
        if(target.charCode == 13) {
            this.onClickSubmit();    
        }
    }

    onClickSubmit() {
        this.authenticationModel.setData({
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        });

        if(this.authenticationModel.isSubmitable()) {
            let me = this;
            me.setState({hasStartedRegistrationCheck: true});  
            
            $.ajax({
                method: 'POST',
                data: {
                    token: this.props.token,
                    action: 'onClickSubmit',
                    data: this.authenticationModel.registrationData()
                },
                url: 'public/process.php',
                success: function(res) {
                    setTimeout(function() { 
                        res = JSON.parse(res);

                        if(res.responseCode === 200) {
                            me.setState({
                                isVerificationCheckComplete: true,
                                wasRegistrationSuccessful: true
                            });
                        } else {
                            me.setState({
                                isVerificationCheckComplete: true,
                                wasRegistrationSuccessful: false
                            });
                        }
                    }, 1000);
                },
                error: function(res) {
                    setTimeout(function() { 
                        me.setState({
                            isVerificationCheckComplete: true,
                            wasRegistrationSuccessful: false
                        });
                    }, 1000);
                }
            });
        }
        else {
            alert('E-mail or password invalid.');
        }
    }
    
    render() {
        return (
            <div className="form__wrap">
                {this.state.hasStartedRegistrationCheck ? (
                    this.state.isVerificationCheckComplete ? (
                        this.state.wasRegistrationSuccessful ? (
                            <VerificationNotice 
                                verificationStatus={true} 
                                title="success!" 
                                subTitle="Registration successful. Check your inbox!"
                                linkText="Return Home"
                                linkLocation="/" />
                        ) : (
                            <VerificationNotice 
                                verificationStatus={false} 
                                title="error!" 
                                subTitle="There was an error processing your registration."
                                linkText="Try Again"
                                linkLocation="/company-registration" />
                        )
                    ) : (
                        <PreLoader />
                    )
                ) : (
                    <div className="form__container">
                        <div className="form-logo"></div>
                        <div className="form-header">Sign Up</div>
                        <div className="form-body">
                            <div className="form-input__section">
                                <input type="text" placeholder="Company Name" className="form-input__value" onChange={(e) => this.handleChange("name", e)} onKeyPress={this.handleKeyPress} />
                            </div>
                            <div className="form-input__section">
                                <input type="email" placeholder="E-mail Address" className="form-input__value" onChange={(e) => this.handleChange("email", e)} onKeyPress={this.handleKeyPress} />
                            </div>
                            <div className="form-input__section">
                                <input type="text" placeholder="Company Address" className="form-input__value" onChange={(e) => this.handleChange("address", e)} onKeyPress={this.handleKeyPress} />
                            </div>
                                <div className="form-input__section">
                                <input type="password" placeholder="Password" className="form-input__value" onChange={(e) => this.handleChange("password", e)} onKeyPress={this.handleKeyPress} />
                            </div>
                            <div className="form-input__section">
                                <input type="password" placeholder="Confirm Password" className="form-input__value" onChange={(e) => this.handleChange("confirmPassword", e)} onKeyPress={this.handleKeyPress} />
                            </div>
                            <div className="form-submission__section">
                                <button className="form__submit-button" onClick={this.onClickSubmit}>Submit</button>
                                <button className="form__submit-link pl-buffer-top-10" onClick={this.onClickLogin}>Already registered?</button>
                            </div>    
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(CompanyRegistration);