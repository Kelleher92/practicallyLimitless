import React, {Component} from 'react';
import $ from 'jquery';
import CompanyLogo from './CompanyLogo';

class AccountDashboardDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyId: this.props.companyId,
            name: this.props.name,
            number:this.props.number,
            email: this.props.email,
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
                        <input type="text" placeholder="Phone Number" className="form-input__value" value={this.state.number} onChange={(e) => this.handleChange("number", e)}/>
                    </div>
              
                    <div className="form-input__section labelled">
                        <div className="form-input__label">E-mail Address</div>
                        <input type="email" placeholder="E-mail Address" className="form-input__value" value={this.state.email} readOnly/>
                    </div>
                    <div> 
                    <button className="pl-button--style-2" onClick={this.onClickResetPassword}>Reset Password</button>
                    </div>
                    <div>
                    <button className="pl-button--style-2" onClick={this.onClickUpdate}>Delete Account</button>              
                    </div>              
                </div>
            </div>
        );
    }
}

export default AccountDashboardDetails;
