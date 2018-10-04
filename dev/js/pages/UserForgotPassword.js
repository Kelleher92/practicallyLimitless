import React, {Component} from 'react';
import $ from 'jquery';
import { Redirect, withRouter } from 'react-router-dom';
import VerificationNotice from '../components/VerificationNotice.js';
import PreLoader from '../components/PreLoader.js';
import { isValidEmail, areAllFieldsComplete } from '../helpers/utils.js';

class UserForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            hasStartedRegistrationCheck: false,
            isVerificationCheckComplete: false,
            wasRegistrationSuccessful: false
        };

        this.onClickSubmit = this.onClickSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(name, e) {
        this.setState({[name]: e.target.value});
    }

    handleKeyPress(target) {
        if(target.charCode == 13) {
            this.onClickSubmit();    
        }
    }

    onClickSubmit() {
        if(areAllFieldsComplete([this.state.email]) && isValidEmail(this.state.email)) {
            let me = this;
            me.setState({hasStartedRegistrationCheck: true});  

            $.ajax({
                method: 'POST',
                data: {
                    token: this.props.token,
                    action: 'userForgotPassword',
                    data: JSON.stringify({email: this.state.email})
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
                                subTitle="Reset password successful. Check your inbox!"
                                linkText="Return Home"
                                linkLocation="/" />
                        ) : (
                            <VerificationNotice 
                                verificationStatus={false} 
                                title="error!" 
                                subTitle="There was an error processing your request."
                                linkText="Try Again"
                                linkLocation="/user-forgot-password" />
                        )
                    ) : (
                        <PreLoader />
                    )
                ) : (
                    <div className="form__container">
                        <div className="form-logo"></div>
                        <div className="form-header">Reset Password</div>
                        <div className="form-body">
                            <div className="form-input__section">
                                <input type="text" placeholder="E-mail Address" className="form-input__value" onChange={(e) => this.handleChange("email", e)} onKeyPress={this.handleKeyPress} autoFocus />
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

export default withRouter(UserForgotPassword);