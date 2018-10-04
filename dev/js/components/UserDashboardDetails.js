import React, {Component} from 'react';
import $ from 'jquery';
import CompanyLogo from './CompanyLogo';

class UserDashboardDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyId: this.props.companyId,
            name: this.props.name,
            skills: this.props.skills,
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
                        <input type="text" placeholder="Name" className="form-input__value" value={this.state.name} onChange={(e) => this.handleChange("name", e)}/>
                    </div>   
                    <div className="form-input__section labelled">
                        <div className="form-input__label">Skills</div>
                        <input type="text" placeholder="Skills" className="form-input__value" value={this.state.skills} onChange={(e) => this.handleChange("skills", e)}/>
                    </div>   
                    <div className="form-input__section labelled">
                        <div className="form-input__label">About Me</div>
                        <textarea rows="5" placeholder="Let charities know your unique interests and skills." className="form-input__value" value={this.state.blurb} onChange={(e) => this.handleChange("blurb", e)}></textarea>
                    </div>
                    
                    
                    

                </div>
            </div>
        );
    }
}

export default UserDashboardDetails;