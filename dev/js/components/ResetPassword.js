import React, {Component} from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { isValidPassword } from '../helpers/utils.js';
import qs from 'query-string';
import $ from 'jquery';

class ResetPassword extends Component {
    constructor(props) {
        super(props);

        let userEmail = qs.parse(this.props.location.search).email;
        
        this.state = {
            email: userEmail,
            password: '',
            confirmPassword: ''
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
            let { history } = this.props;

            $.ajax({
                method: 'POST',
                data: {
                    token: this.props.token,
                    action: 'companyResetPassword',
                    data: JSON.stringify({email: this.state.email, password: this.state.password})
                },
                url: 'public/process.php',
                success: function(res) {
                    console.log(res);
                    res = JSON.parse(res);

                    if(res.responseCode === 200) {
                        history.push('/');
                    } else {
                        alert(res.message);
                    }
                },
                error: function(res) {
                    console.log(res);
                }
            });
        }
    }
    
    render() {
        return (
            <div className="form__wrap">
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
            </div>
        );
    }
}

export default withRouter(ResetPassword);