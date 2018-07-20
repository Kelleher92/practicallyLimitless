import React, {Component} from 'react';
import $ from 'jquery';
import { Redirect, withRouter } from 'react-router-dom';


class ForgottenPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CompanyEmail: ''
        };
        this.onClickForgottenPassword = this.onClickForgottenPassword.bind(this);
    }

    handleChange(name, e) {
        this.setState({[name]: e.target.value});
    }

    onClickForgottenPassword(){
        let { history } = this.props;
        $.ajax({
            method: 'POST',
            data: {
                token: this.props.token,
                action: 'companyForgotPassword',
                data: JSON.stringify({email: this.state.CompanyEmail})
            },
            url: 'public/process.php',
            success: function(res) {
                res = JSON.parse(res);
                if(res.responseCode === 200) {
                    history.push('/');
                } else {
                    console.log(res.responseCode)
                }
            },
            error: function(res) {
                console.log('Error');
                console.log(res);
            }
        });
    }
    
    render() {
        return (
            <div className="forgotten-password">
                 <div className="form-header"> Forgot Password </div>
                 <div className="form-body">

                 <div className="form-input__section">
                    <input id="CompanyEmail" type="text" name="CompanyEmail" placeholder="Company Email" className="form-input__value" onChange={(e) => this.handleChange("CompanyEmail", e)}/>
                 </div>
                 <div className="form-submission__section">
                    <button className="form__submit-button" onClick={this.onClickForgottenPassword}> Submit </button>
                 </div>    
                 </div>                       
            </div>
        );
    }
}

export default withRouter(ForgottenPassword);