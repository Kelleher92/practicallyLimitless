import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { dateIsNotPast, isValidString } from '../helpers/utils.js';
import $ from 'jquery';
import PreLoader from '../components/PreLoader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DashboardTable from '../components/DashboardTable';
import DashboardDetails from '../components/DashboardDetails';

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
            currentOffers: [],
            expiredOffers: [],
            homeTab: true,
            newOffer: false
        }

        this.onClickLogout = this.onClickLogout.bind(this);
        this.onClickNew = this.onClickNew.bind(this);
        this.onClickCreate = this.onClickCreate.bind(this);
	    this.switchTab = this.switchTab.bind(this);
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
                        	name: res.data.company.name,
                        	email: res.data.company.email,
                        	address: res.data.company.address,
                            currentOffers: res.data.currentOffers,
                            expiredOffers: res.data.expiredOffers,
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

    isSubmitable() {
        return dateIsNotPast(this.state.offerExpiry) && isValidString(this.state.offerName);
    }
   
    onClickCreate() {
        if(this.isSubmitable()) {
            let me = this;

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
                        me.props.showFlashNotification(res.message);
                    } else {
                        me.props.showFlashNotification(res.message);
                    }
                },
                error: function(res) {

                }
            });
            this.setState({
                currentOffers: [...this.state.currentOffers, {
                    id: this.state.currentOffers.length + this.state.expiredOffers.length, 
                    offerName: this.state.offerName, 
                    expiryDate: this.state.offerExpiry}],
                offerName: "", offerExpiry: ""
            })
        }
    } 

	onClickLogout() {
		let { history } = this.props;

        this.props.setLoggedOut();
		history.push('/');
	}

    switchTab(index) {
        this.setState({homeTab: index === 0, newOffer: false});
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
                                <div className={"dashboard__tab " + (this.state.homeTab ? 'selected' : 'unselected')} onClick={() => this.switchTab(0)}>Company Details</div>
                                <div className={"dashboard__tab " + (!this.state.homeTab ? 'selected' : 'unselected')} onClick={() => this.switchTab(1)}>Offers</div>
                            </div>
                                {this.state.homeTab ? (
                                    <DashboardDetails token={this.props.token} companyId={this.props.companyId} name={this.state.name} address={this.state.address} email={this.state.email} showFlashNotification={this.props.showFlashNotification} />
                                ) : (this.state.newOffer ? (
                                    <div className="form-body">
                                        <div className="form-input__section">
                                        </div>
                                        <div className="form-input__section">
                                        </div>
                                        <div className="form-input__section labelled">
                                            <div className="form-input__label">Offer Name</div>
                                            <input type="text" placeholder="Offer Name" className="form-input__value" value={this.state.offerName} onChange={(e) => this.handleChange("offerName", e)} />
                                        </div>
                                        <div className="form-input__section labelled">
                                            <div className="form-input__label">Offer Expiry Date</div>
                                            <input type="date" placeholder="Valid Until" className="form-input__value" value={this.state.offerExpiry} onChange={(e) => this.handleChange("offerExpiry", e)} />
                                        </div>
                                        <div className="form-input__section">
                                            <button className="form__submit-button" onClick={this.onClickCreate}>Create</button>
                                        </div>
                                    </div>
                                ) : (
                                    <DashboardTable active={this.state.currentOffers} expired={this.state.expiredOffers} onClickNew={this.onClickNew} />
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