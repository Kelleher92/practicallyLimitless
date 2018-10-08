import React, {Component} from 'react';
import $ from 'jquery';
import CompanyLogo from './CompanyLogo';
import { Link, withRouter } from 'react-router-dom';
import { isValidString } from '../helpers/utils.js';

class AccountDashboardDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyId: this.props.companyId,
            name: this.props.name,
            number:this.props.number,
            email: this.props.email,
        };

        this.onClickDelete = this.onClickDelete.bind(this);
    }
   
    handleChange(name, e) {
        this.setState({[name]: e.target.value});
        this.props.updateDetails([name], e.target.value);
    }

    isSubmitable() {
        return isValidString(this.state.name);
    }

    onClickDelete() {
        if(this.isSubmitable()) {
            let me = this;
            
            $.ajax({
                method: 'POST',
                data: {
                    token: this.props.token,
                    action: 'deleteUser',
                    data: JSON.stringify({companyId: this.props.companyId})
                },
                url: 'public/process.php',
                success: function(res) {
                    setTimeout(function() { 
                        res = JSON.parse(res);

                        if(res.responseCode === 200) {
                            me.props.showFlashNotification(res.message);
                        } else {
                            me.props.showFlashNotification(res.message);
                        }
                    }, 1000);
                },
                error: function(res) {
                    setTimeout(function() { 
                        me.props.showFlashNotification(res.message);
                    }, 1000);
                }
            });
        }
        else {
            this.props.showFlashNotification('Deletion of information failed, please try again.');
        }
    }

    render() {
        let resetButton = <Link to="/user-forgot-password"><button className="pl-button--style-2">Reset Password</button></Link>;
        let deleteButton = <Link to="/"><button className="pl-button--style-2" onClick={this.onClickDelete}>Delete Account</button></Link>;

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

                    <div className="d-flex">
                        <div> 
                            {resetButton}
                        </div>
                        <div>
                            {deleteButton}             
                        </div>              
                    </div>              
                </div>
            </div>
        );
    }
}

export default AccountDashboardDetails;