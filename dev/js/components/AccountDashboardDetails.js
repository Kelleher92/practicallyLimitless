import React, {Component} from 'react';
import $ from 'jquery';
import CompanyLogo from './CompanyLogo';

class AccountDashboardDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyId: this.props.companyId,
            name: this.props.name,
            email: this.props.email,
            blurb: this.props.blurb
        };
    }

    handleChange(name, e) {
        this.setState({[name]: e.target.value});
        this.props.updateDetails([name], e.target.value);
    }
    
    render() {
        return (
            <div className="d-flex flex-column flex-md-row">
                <div className="form-company-details__logo">
                    <CompanyLogo logo={this.props.logo} 
                                companyId={this.state.companyId}
                                token={this.props.token}
                                handleUpdateLogo={this.props.handleUpdateLogo}/>
                </div>
                <div className="form-body">
                    <div className="form-input__section labelled">
                        <div className="form-input__label">Phone Number</div>
                        <input type="text" placeholder="Phone Number" className="form-input__value" value='083-069-1234' onChange={(e) => this.handleChange("name", e)}/>
                    </div>
              
                    <div className="form-input__section labelled">
                        <div className="form-input__label">E-mail Address</div>
                        <input type="email" placeholder="E-mail Address" className="form-input__value" value={this.state.email} readOnly/>
                    </div> 
                    <button className="form__submit-button" onClick={this.onClickUpdate}>Update</button>
                    <br></br>
                    <br></br>
                        
                    <button className="form__submit-button" onClick={this.onClickUpdate}>Reset Password</button>
                    <br></br>
                    <button className="form__submit-button" onClick={this.onClickUpdate}>Delete Account</button>
                    
                    

                </div>
            </div>
        );
    }
}

export default AccountDashboardDetails;