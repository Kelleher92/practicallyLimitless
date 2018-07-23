import React, {Component} from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { isValidPassword } from '../helpers/utils.js';
import VerificationNotice from './VerificationNotice.js';
import PreLoaderBounce from './PreLoaderBounce.js';
import qs from 'query-string';
import $ from 'jquery';

class ResetPassword extends Component {
    constructor(props) {
        super(props);

        let userEmail = qs.parse(this.props.location.search).email;
        
        this.state = {
            email: userEmail,
            password: '',
            confirmPassword: '',
            hasStartedRegistrationCheck: false,
            isVerificationCheckComplete: false,
            wasRegistrationSuccessful: false
        };

        this.onClickSubmit = this.onClickSubmit.bind(this);
        this.isPasswordConfirmValid = this.isPasswordConfirmValid.bind(this);
        this.isSubmitable = this.isSubmitable.bind(this);
    }

    handleChange(name, e) {
        this.setState({[name]: e.target.value});
    }

    isPasswordConfirmValid() {
       return this.state.password === this.state.confirmPassword;
    }

    isSubmitable() {
        return isValidPassword(this.state.password) && this.isPasswordConfirmValid();
    }

    onClickSubmit() {
        if(this.isSubmitable) {
            let me = this;
            me.setState({hasStartedRegistrationCheck: true});  

            $.ajax({
                method: 'POST',
                data: {
                    token: this.props.token,
                    action: 'companyResetPassword',
                    data: JSON.stringify({email: this.state.email, password: this.state.password})
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
                        console.log(res);
                        me.setState({
                            isVerificationCheckComplete: true,
                            wasRegistrationSuccessful: false
                        });
                    }, 1000);
                }
            });
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
                                subTitle="Change password successful. You can now proceed to log in!"
                                linkText="Log In"
                                linkLocation="/company-login" />
                        ) : (
                            <VerificationNotice 
                                verificationStatus={false} 
                                title="error!" 
                                subTitle="There was an error processing your request."
                                linkText="Try Again"
                                linkLocation="/company-forgot-password" />
                        )
                    ) : (
                        <PreLoaderBounce />
                    )
                ) : (
                    <div className="form__container">
                        <div className="form-header">Set New Password</div>
                        <div className="form-body">
                            <div className="form-input__section">
                                <input type="password" placeholder="New Password" className="form-input__value" onChange={(e) => this.handleChange("password", e)}/>
                            </div>                 
                            <div className="form-input__section">
                                <input type="password" placeholder="Confirm Password" className="form-input__value" onChange={(e) => this.handleChange("confirmPassword", e)}/>
                            </div>
                            <div className="form-submission__section">
                                <button className="form__submit-button" onClick={this.onClickSubmit}>Submit</button>
                            </div>    
                        </div>                       
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(ResetPassword);