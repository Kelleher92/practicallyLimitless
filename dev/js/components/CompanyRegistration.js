/*
 * @Author: Sean Bermingham
 * @Date: 2018-07-16  
 */

 import React, {Component} from 'react';
 import $ from 'jquery';

 

 export default class CompanyRegistration extends Component {
    constructor(){
        super();
        this.state = {
            CompanyName: '',
            CompanyAddress: '',
            CompanyEmail: '',
            CompanyPassword: '',
            CompanyPasswordCheck: ''
        };
        //anywhere that needs this.props
        this.onSubmit = this.onSubmit.bind(this);
    }
    handleChange(name, e){
        this.setState({ [name]: e.target.value });
    }
    onSubmit(){
        console.log('Got into Submit ');
        $.ajax({
            method: 'POST',
            data: {
                token: this.props.token,
                action: 'registerCompany',
                data: JSON.stringify({name: this.state.CompanyName, email: this.state.CompanyName, address: this.state.CompanyAddress, password: this.state.CompanyPassword})
            },
            url: 'public/process.php',
            success: function(res) {
                console.log(res);
            },
            error: function(res) {
                console.log(res);
            }
        });
    }

    render() {
        return (
            <div>
                 <div className="form-header"> Company Registration Form </div>
                 <div>
                    <div className="form-input__heading">
                        Company Details
                    </div>
                     <div className="form-input__section">
                         <input id="CompanyName" type="text" name="CompanyName" placeholder="Company Name" className="form-input__value" onChange={(e) => this.handleChange("CompanyName", e)}/>
                     </div>
                      <div className="form-input__section">
                         <input id="CompanyAddress" type="text" name="CompanyAddress" placeholder = "Company Address" className="form-input__value" onChange={(e) => this.handleChange("CompanyAddress", e)}/>
                     </div>
                    <div className="form-input__section">
                         <input id="CompanyEmail" type="email" name="CompanyEmail" placeholder = "Email Address" className="form-input__value" onChange={(e) => this.handleChange("CompanyEmail", e)}/>
                     </div>
                       <div className="form-input__section">
                         <input id="CompanyPassword" type="password" name="CompanyPassword" placeholder = "Password" className="form-input__value" onChange={(e) => this.handleChange("CompanyPassword", e)}/>
                     </div>
                     <div className="form-input__section">
                         <input id="CompanyPasswordCheck" type="password" name="CompanyPasswordCheck" placeholder = "Password Verification" className="form-input__value" onChange={(e) => this.handleChange("CompanyPasswordCheck", e)}/>
                     </div>
                 </div>
                <button className="form__submit-button" onClick={this.onSubmit}>Submit Company Details</button>
                 
             </div>
        );
    }
 }