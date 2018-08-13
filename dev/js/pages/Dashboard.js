import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { isValidString } from '../helpers/utils.js';
import $ from 'jquery';
import PreLoader from '../components/PreLoader';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Dashboard extends Component {
	constructor(props) {
        super(props);
 		
 		this.state = {
            checkComplete: false,
            name: '',
            email: '',
            address: '',
            offerName: '',
            offerExpiry: '',
            homeTab: true,
            newOffer: false
        }

        this.onClickLogout = this.onClickLogout.bind(this);
        this.onClickNew = this.onClickNew.bind(this);
        this.onClickCreate = this.onClickCreate.bind(this);
	    this.toggleTab = this.toggleTab.bind(this);
	}

	componentDidMount() {
		var me = this;
        $.ajax({
            method: 'POST',
            data: {
                token: this.props.token,
                action: 'fetchCompany',
                data: JSON.stringify({companyId: this.props.companyId})
            },
            url: 'public/process.php',
            success: function(res) {
                setTimeout(function() { 
                    res = JSON.parse(res);

                    if(res.responseCode === 200) {
                        me.setState({
                        	name: res.data.name,
                        	email: res.data.email,
                        	address: res.data.address,
                            checkComplete: true
                        });
                    } else {
                        me.setState({
                            checkComplete: true
                        });
                    }
                }, 500);
            },
            error: function(res) {
                setTimeout(function() { 
                    me.setState({
                        checkComplete: true
                    });
                }, 500);
            }
        });
    }

    onClickNew() {
        this.setState({newOffer: true});
    }

    handleChange(name, e) {
        this.setState({[name]: e.target.value});
    }

    isValidName() {
        return isValidString(this.state.offerName);
    }
   
    isValidDate() {
        return isValidString(this.state.offerExpiry);
    }

    isSubmitable() {
        return this.isValidName() && this.isValidDate();
    }
   
    onClickCreate() {
        if(this.isSubmitable()) {
            $.ajax({
                method: 'POST',
                data: {
                    token: this.props.token,
                    action: 'insertOffer',
                    data: JSON.stringify({companyId: this.props.companyId, name: this.state.offerName, expiry: this.state.offerExpiry})
                },
                url: 'public/process.php',
                success: function(res) {
                    res = JSON.parse(res);

                    if(res.responseCode === 200) {
                        alert(res.message);
                    } else {
                        alert(res.message);
                    }
                },
                error: function(res) {

                }
            });
        }
    }

	onClickLogout() {
		let { history } = this.props;

        this.props.setLoggedOut();
		history.push('/');
	}

    toggleTab() {
        this.setState({homeTab: !this.state.homeTab, newOffer: false});
    }

    render() {
        return (
            <div className="contain">               
                <Header isLoggedIn={this.props.isLoggedIn} setLoggedOut={this.props.setLoggedOut} includeShadow={false}/>
                <div className="home-contain justify-content-center">
                    <div className="form__wrap">
                    {this.state.checkComplete ? (
                        <div className="form__container wide">
                            <div className="dashboard__tab-container d-flex">
                                <div className={"dashboard__tab " + (this.state.homeTab ? 'selected' : 'unselected')} onClick={this.toggleTab}>Company Details</div>
                                <div className={"dashboard__tab " + (!this.state.homeTab ? 'selected' : 'unselected')} onClick={this.toggleTab}>Offers</div>
                            </div>
                                {this.state.homeTab ? (
                                    <div className="form-body">
                                        <div className="form-input__section labelled">
                                            <div className="form-input__label">Company Name</div>
                                            <input type="text" placeholder="Company Name" className="form-input__value" value={this.state.name} readOnly/>
                                        </div>
                                        <div className="form-input__section labelled">
                                            <div className="form-input__label">Company Address</div>
                                            <input type="text" placeholder="Company Address" className="form-input__value" value={this.state.address} readOnly/>
                                        </div>
                                        <div className="form-input__section labelled">
                                            <div className="form-input__label">E-mail Address</div>
                                            <input type="email" placeholder="E-mail Address" className="form-input__value" value={this.state.email} readOnly/>
                                        </div>       
                                    </div>
                                ) : (this.state.newOffer ? (
                                    <div className="form-body">
                                        <div className="form-input__section">
                                            <input type="text" placeholder="Offer Name" className="form-input__value" value={this.state.offerName} onChange={(e) => this.handleChange("offerName", e)}/>
                                        </div>
                                        <div className="form-input__section">
                                            <input type="date" placeholder="Valid Until" className="form-input__value" value={this.state.offerExpiry} onChange={(e) => this.handleChange("offerExpiry", e)}/>
                                        </div>
                                        <div className="form-input__section">
                                            <button className="form__submit-button" onClick={this.onClickCreate}>Create</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="form-body">
                                        <div className="form-input__section">
                                            Current Offers: 
                                        </div>
                                        <div className="form-input__section">
                                            Expired Offers: 
                                        </div>
                                        <div className="form-input__section">
                                            <button className="form__submit-button" onClick={this.onClickNew}>New Offer</button>
                                        </div>
                                    </div>
                                    )
                                )}
                        </div>
                    ) : (
                        <PreLoader />
                    )}
                </div>
            </div>
            <Footer />
            </div>
        );
    }
}

export default withRouter(Dashboard);