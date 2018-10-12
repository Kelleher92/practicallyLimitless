import React, {Component} from 'react';
import { dateIsNotPast, isValidString } from '../helpers/utils.js';

class DashboardCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offerName: '',
            requirements: '',
            offerExpiry: ''
        };

        this.onClickCreate = this.onClickCreate.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
    }

    handleChange(name, e) {
        this.setState({[name]: e.target.value});
    }
    
    isSubmitable() {
        return dateIsNotPast(this.state.offerExpiry) && isValidString(this.state.requirements) && isValidString(this.state.offerName);
    }

    onClickCreate() {
        if(this.isSubmitable()) {
            this.props.createNewOffer(this.state.offerName, this.state.requirements, this.state.offerExpiry);
        }

    }

    onClickCancel() {
        this.props.newOffer= false;
    }

    render() {
        return (
            <div className="form-body">
                <div className="form-input__section labelled">
                    <div className="form-input__label">Task Name</div>
                    <input type="text" placeholder="Task Name" className="form-input__value" value={this.state.offerName} onChange={(e) => this.handleChange("offerName", e)} autoFocus />
                </div>
                <div className="form-input__section labelled">
                    <div className="form-input__label">Skills Required</div>
                    <textarea rows="5" placeholder="Skills, equipment etc." className="form-input__value" value={this.state.requirements} onChange={(e) => this.handleChange("requirements", e)} ></textarea>
                </div>
                <div className="form-input__section labelled">
                    <div className="form-input__label">Task Expiry Date</div>
                    <input type="date" placeholder="Valid Until" className="form-input__value" value={this.state.offerExpiry} onChange={(e) => this.handleChange("offerExpiry", e)} />
                </div>
                <div className="form-input__section">
                    <button className="pl-button--style-2" onClick={this.onClickCreate}>Create</button>
                </div>
                <div className="form-input__section">
                    <button className="pl-button--style-2" onClick={this.onClickCancel} >Cancel</button>
                </div>
            </div>
        );
    }
}

export default DashboardCreate;