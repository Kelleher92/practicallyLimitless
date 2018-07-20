import React, {Component} from 'react';
import $ from 'jquery';
import { Redirect, withRouter } from 'react-router-dom';


class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
        this.onClickSubmit = this.onClickSubmit.bind(this);
    }

    handleChange(name, e) {
        this.setState({[name]: e.target.value});
    }

    onClickSubmit() {
        let { history } = this.props;
        $.ajax({
            method: 'POST',
            data: {
                token: this.props.token,
                action: 'companyForgotPassword',
                data: JSON.stringify({email: this.state.email})
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
                console.log('Error');
                console.log(res);
            }
        });
    }
    
    render() {
        return (
            <div className="forgotten-password">
                <div className="form-header">Forgot Password</div>
                <div className="form-body">
                    <div className="form-input__section">
                        <input type="text" placeholder="E-mail Address" className="form-input__value" onChange={(e) => this.handleChange("email", e)}/>
                    </div>
                    <div className="form-submission__section">
                        <button className="form__submit-button" onClick={this.onClickSubmit}>Submit</button>
                    </div>    
                </div>                       
            </div>
        );
    }
}

export default withRouter(ForgotPassword);
