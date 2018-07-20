import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { isValidEmail, isValidPassword, isValidString } from '../helpers/utils.js';
import $ from 'jquery';

class CompanyRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.registerCompany = this.registerCompany.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
    }

    handleChange(name, e) {
        this.setState({[name]: e.target.value});
    }

    isPasswordConfirmValid() {
        return this.state.password === this.state.confirmPassword;
    }

    isValidName() {
        return isValidString(this.state.name);
    }
   
    isValidAddress() {
        return isValidString(this.state.address);
    }
   
    isSubmitable() {
        return this.isValidName() && this.isValidAddress() && isValidEmail(this.state.email) && isValidPassword(this.state.password) && this.isPasswordConfirmValid();
    }
   
    onSubmit() {
        this.registerCompany();
        this.navigateTo('/pl');
    }

    navigateTo(path) {
        let { history } = this.props;
        history.push(path);
    }

    registerCompany() {
        var me = this;

        $.ajax({
            method: 'POST',
            data: {
                token: this.props.token,
                action: 'registerCompany',
                data: JSON.stringify({name: this.state.name, email: this.state.email, address: this.state.address, password: this.state.password})
            },
            url: 'public/process.php',
            success: function(res) {
                res = JSON.parse(res);
                if(res.responseCode === 200) {
                    this.navigateTo('/');
                } else {
                    alert(res.message);
                }
            },
            error: function(res) {
                console.log(res);
            }
        });
    }
    
    render() {
        return (
            <div className="company-registration-form">
                <div className="form-header">Company Registration Form</div>
                <div className="form-body">

                    <div className="form-input__section">
                        <input type="text" placeholder="Company Name" className="form-input__value" onChange={(e) => this.handleChange("name", e)}/>
                    </div>
                    <div className="form-input__section">
                        <input type="text" placeholder="Company Address" className="form-input__value" onChange={(e) => this.handleChange("address", e)}/>
                    </div>
                    <div className="form-input__section">
                        <input type="email" placeholder="E-mail Address" className="form-input__value" onChange={(e) => this.handleChange("email", e)}/>
                    </div>
                        <div className="form-input__section">
                        <input type="password" placeholder="Password" className="form-input__value" onChange={(e) => this.handleChange("password", e)}/>
                    </div>
                    <div className="form-input__section">
                        <input type="password" placeholder="Confirm Password" className="form-input__value" onChange={(e) => this.handleChange("confirmPassword", e)}/>
                    </div>
                    <div className="form-submission__section">
                        <button className="form__submit-button" onClick={this.registerCompany}>Submit</button>
                    </div>    
                </div>                       
            </div>
        );
    }
}

export default withRouter(CompanyRegistration);