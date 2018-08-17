import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import PreLoader from '../components/PreLoader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DashboardTable from '../components/DashboardTable';
import DashboardDetails from '../components/DashboardDetails';
import DashboardCreate from '../components/DashboardCreate';
import LocationMap from '../components/LocationMap';

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
            tab: 0,
            newOffer: false
        }

        this.onClickNew = this.onClickNew.bind(this);
	    this.switchTab = this.switchTab.bind(this);
        this.createNewOffer = this.createNewOffer.bind(this);
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
   
    createNewOffer(name, expiry) {
        let me = this;

        $.ajax({
            method: 'POST',
            data: {
                token: this.props.token,
                action: 'insertOffer',
                data: JSON.stringify({companyId: this.props.companyId, name: name, expiry: expiry})
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
                offerName: name, 
                expiryDate: expiry}],
            offerName: "", offerExpiry: ""
        })
    } 

    switchTab(index) {
        this.setState({tab: index, newOffer: false});
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
                                <div className={"dashboard__tab " + (this.state.tab === 0 ? 'selected' : 'unselected')} onClick={() => this.switchTab(0)}>Company Details</div>
                                <div className={"dashboard__tab " + (!this.state.tab === 1 ? 'selected' : 'unselected')} onClick={() => this.switchTab(1)}>Offers</div>
                                <div className={"dashboard__tab " + (!this.state.tab === 2 ? 'selected' : 'unselected')} onClick={() => this.switchTab(2)}>Location</div>
                            </div>
                                {this.state.tab === 0 ? (
                                    <DashboardDetails token={this.props.token} companyId={this.props.companyId} name={this.state.name} address={this.state.address} email={this.state.email} showFlashNotification={this.props.showFlashNotification} />
                                ) : (
                                this.state.tab === 2 ? (
                                    <LocationMap />
                                ) : (
                                this.state.newOffer ? (
                                    <DashboardCreate createNewOffer={this.createNewOffer} />
                                ) : (
                                    <DashboardTable active={this.state.currentOffers} expired={this.state.expiredOffers} onClickNew={this.onClickNew} />
                                    ))
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