import React, {Component} from 'react';
import $ from 'jquery';
import { Redirect, withRouter } from 'react-router-dom';


class CompanyLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        
        this.onClickLogin = this.onClickLogin.bind(this);
        this.onClickForgotPassword = this.onClickForgotPassword.bind(this);
    }

    handleChange(name, e) {
        this.setState({[name]: e.target.value});
    }

    onClickLogin() {
        let { history } = this.props;

        $.ajax({
            method: 'POST',
            data: {
                token: this.props.token,
                action: 'loginCompany',
                data: JSON.stringify({email: this.state.email, password: this.state.password})
            },
            url: 'public/process.php',
            success: function(res) {
                res = JSON.parse(res);
                if(res.responseCode === 200) {
                    history.push('/dashboard');
                } else {
                    alert(res.message);
                }
            },
            error: function(res) {
                console.log(res);
            }
        });
    }

    onClickForgotPassword() {
        let { history } = this.props;
        history.push('/company-forgot-password');
    }
    
    render() {
        return (
            <div className="company-login-form">
                <div className="form-header">Login</div>
                <div className="form-body">
                <div className="form-input__section">
                    <input type="text" placeholder="E-mail address" className="form-input__value" onChange={(e) => this.handleChange("email", e)}/>
                </div>
                <div className="form-input__section">
                    <input type="password" placeholder="Password" className="form-input__value" onChange={(e) => this.handleChange("password", e)}/>
                </div>
                    <div className="form-submission__section">
                        <button className="form__submit-button" onClick={this.onClickLogin}>Login</button>
                        <button className="form__submit-button" onClick={this.onClickForgotPassword}>Forgot Password</button>
                    </div>    
                </div>                       
            </div>
        );
    }
}

export default withRouter(CompanyLogin);