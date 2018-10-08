import React, {Component} from 'react';
import $ from 'jquery';
import { Redirect, withRouter } from 'react-router-dom';
import { isValidEmail, isValidPassword, areAllFieldsComplete } from '../helpers/utils.js';

class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        
        this.onClickSubmit = this.onClickSubmit.bind(this);
        this.onClickLogo = this.onClickLogo.bind(this);
        this.onClickForgotPassword = this.onClickForgotPassword.bind(this);
        this.onClickSignup = this.onClickSignup.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(name, e) {
        this.setState({[name]: e.target.value});
    }
    
    onClickLogo() {
        let { history } = this.props;
        history.push('/home');
    }

    onClickSubmit() { 
        let me = this;

        if(areAllFieldsComplete([this.state.email, this.state.password]) && isValidEmail(this.state.email) && isValidPassword(this.state.password)) {
            let { history } = this.props;

            this.props.setLoggedInUser(this.state.email, this.state.password).then(function(res) {
                res = JSON.parse(res);

                if(res.responseCode === 200) {
                    history.push('/user-dashboard');
                } else {
                    me.props.showFlashNotification(res.message);
                }
            });
        }
    }

    handleKeyPress(target) {
        if(target.charCode == 13) {
            this.onClickSubmit();    
        }
    }

    onClickForgotPassword() {
        let { history } = this.props;
        history.push('/user-forgot-password');
    }

     onClickSignup() {
        let { history } = this.props;
        history.push('/user-registration');
    }
    
    render() {
        return (
            <div className="form__wrap">
                <div className="form__container">
                    <div className="form-logo" onClick={this.onClickLogo}></div>
                    <div className="form-header">Log In</div>
                    <div className="form-body">
                    <div className="form-input__section">
                        <input type="text" placeholder="E-mail Address" className="form-input__value" onChange={(e) => this.handleChange("email", e)} onKeyPress={this.handleKeyPress} autoFocus />
                    </div>
                    <div className="form-input__section">
                        <input type="password" placeholder="Password" className="form-input__value" onChange={(e) => this.handleChange("password", e)} onKeyPress={this.handleKeyPress} />
                    </div>
                        <div className="form-submission__section">
                            <button className="form__submit-button" onClick={this.onClickSubmit}>Login</button>
                            <button className="form__submit-link pl-buffer-top-10" onClick={this.onClickForgotPassword}>Forgot Password?</button>
                            <button className="form__submit-link pl-buffer-top-10" onClick={this.onClickSignup}>New User? Click here to register</button>
                        </div>    
                    </div>                       
                </div>
            </div>
        );
    }
}

export default withRouter(UserLogin);