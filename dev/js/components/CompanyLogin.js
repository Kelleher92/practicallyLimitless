import React, {Component} from 'react';
import $ from 'jquery';
import { Redirect, withRouter } from 'react-router-dom';


class CompanyLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CompanyEmail: '',
            CompanyPassword: ''
        };
        
        this.onClickLogin = this.onClickLogin.bind(this);
        this.onClickForgottenPassword = this.onClickForgottenPassword.bind(this);
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
                data: JSON.stringify({email: this.state.CompanyEmail, password: this.state.CompanyPassword})
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

    onClickForgottenPassword(){
        let { history } = this.props;
        history.push('/company-forgot-password');

    }
    
    render() {
        return (
            <div className="company-login-form">
                 <div className="form-header"> Login </div>
                 <div className="form-body">
                     <div className="form-input__section">
                        <input id="CompanyName" type="text" name="CompanyName" placeholder="Company Name" className="form-input__value" onChange={(e) => this.handleChange("CompanyEmail", e)}/>
                     </div>
                     <div className="form-input__section">
                        <input id="CompanyPassword" type="password" name="CompanyPassword" placeholder="Password" className="form-input__value" onChange={(e) => this.handleChange("CompanyPassword", e)}/>
                     </div>
                     <div className="form-submission__section">
                        <button className="form__submit-button" onClick={this.onClickLogin}> Login </button>
                        <button className="form__submit-button" onClick={this.onClickForgottenPassword}> Forgotten Password </button>
                     </div>    
                 </div>                       
            </div>
        );
    }
}

export default withRouter(CompanyLogin);
