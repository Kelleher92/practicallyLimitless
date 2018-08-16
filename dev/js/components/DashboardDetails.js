import React, {Component} from 'react';
import $ from 'jquery';
import { isValidString } from '../helpers/utils.js';

class DashboardDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyId: this.props.companyId,
            name: this.props.name,
            address: this.props.address,
            email: this.props.email
        };

        this.onClickUpdate = this.onClickUpdate.bind(this);
    }

    handleChange(name, e) {
        this.setState({[name]: e.target.value});
    }

    isSubmitable() {
        return isValidString(this.state.name) && isValidString(this.state.address);
    }

    onClickUpdate() {
        if(this.isSubmitable()) {
            let me = this;
            
            $.ajax({
                method: 'POST',
                data: {
                    token: this.props.token,
                    action: 'updateCompany',
                    data: JSON.stringify({companyId: this.props.companyId, name: this.state.name, address: this.state.address})
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
            this.props.showFlashNotification('Update of information failed, please try again.');
        }
    }
    
    render() {
        return (
            <div className="form-body">
                <div className="form-input__section labelled">
                    <div className="form-input__label">Company Name</div>
                    <input type="text" placeholder="Company Name" className="form-input__value" value={this.state.name} onChange={(e) => this.handleChange("name", e)}/>
                </div>
                <div className="form-input__section labelled">
                    <div className="form-input__label">Company Address</div>
                    <input type="text" placeholder="Company Address" className="form-input__value" value={this.state.address} onChange={(e) => this.handleChange("address", e)}/>
                </div>
                <div className="form-input__section labelled">
                    <div className="form-input__label">E-mail Address</div>
                    <input type="email" placeholder="E-mail Address" className="form-input__value" value={this.state.email} readOnly/>
                </div>   
                <div className="form-input__section">
                    <button className="form__submit-button" onClick={this.onClickUpdate}>Update</button>
                </div>    
            </div>
        );
    }
}

export default DashboardDetails;