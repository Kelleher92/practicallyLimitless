import React, {Component} from 'react';
import $ from 'jquery';
import CompanyLogo from './CompanyLogo';

class DashboardDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyId: this.props.companyId,
            name: this.props.name,
            address: this.props.address,
            email: this.props.email,
            number: this.props.number,
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
                        <div className="form-input__label">Name</div>
                        <input type="text" placeholder="Company Name" className="form-input__value" value={this.state.name} onChange={(e) => this.handleChange("name", e)}/>
                    </div>
                    <div className="form-input__section labelled">
                        <div className="form-input__label">Address</div>
                        <input type="text" placeholder="Company Address" className="form-input__value" value={this.state.address} readOnly/>
                    </div>            
                    <div className="form-input__section labelled">
                        <div className="form-input__label">E-mail Address</div>
                        <input type="email" placeholder="E-mail Address" className="form-input__value" value={this.state.email} readOnly/>
                    </div>     
                    <div className="form-input__section labelled">
                        <div className="form-input__label">Charity Number</div>
                        <input type="text" placeholder="Required for activation" className="form-input__value" value={this.state.number} onChange={(e) => this.handleChange("number", e)}/>
                    </div> 
                    <div className="form-input__section labelled">
                        <div className="form-input__label">About</div>
                        <textarea rows="5" placeholder="Let volunteers know what you're all about" className="form-input__value" value={this.state.blurb} onChange={(e) => this.handleChange("blurb", e)}></textarea>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardDetails;