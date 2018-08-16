import React, {Component} from 'react';
import { dateIsNotPast, isValidString } from '../helpers/utils.js';

class DashboardCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offerName: '',
            offerExpiry: ''
        };

        this.onClickCreate = this.onClickCreate.bind(this);
    }

    handleChange(name, e) {
        this.setState({[name]: e.target.value});
    }
    
    isSubmitable() {
        return dateIsNotPast(this.state.offerExpiry) && isValidString(this.state.offerName);
    }

    onClickCreate() {
        if(this.isSubmitable()){
            this.props.createNewOffer(this.state.offerName, this.state.offerExpiry);
        }
    }

    render() {
        return (
            <div className="form-body">
                <div className="form-input__section labelled">
                    <div className="form-input__label">Offer Name</div>
                    <input type="text" placeholder="Offer Name" className="form-input__value" value={this.state.offerName} onChange={(e) => this.handleChange("offerName", e)} autoFocus />
                </div>
                <div className="form-input__section labelled">
                    <div className="form-input__label">Offer Expiry Date</div>
                    <input type="date" placeholder="Valid Until" className="form-input__value" value={this.state.offerExpiry} onChange={(e) => this.handleChange("offerExpiry", e)} />
                </div>
                <div className="form-input__section">
                    <button className="form__submit-button" onClick={this.onClickCreate}>Create</button>
                </div>
            </div>
        );
    }
}

export default DashboardCreate;