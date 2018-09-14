import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { isValidString } from '../helpers/utils.js';
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
            number: '',
            blurb: '',
            logo: '',
            geoCoor: '',
            offerName: '',
            offerExpiry: '',
            currentOffers: [],
            expiredOffers: [],
            tab: 0,
            newOffer: false
        }

        this.onClickNew = this.onClickNew.bind(this);
        this.onClickUpdate = this.onClickUpdate.bind(this);
	    this.switchTab = this.switchTab.bind(this);
        this.createNewOffer = this.createNewOffer.bind(this);
        this.updateDetails = this.updateDetails.bind(this);
        this.updateGeoCoor = this.updateGeoCoor.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.handleUpdateLogo = this.handleUpdateLogo.bind(this);
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
                            logo: res.data.company.logo,
                            number: res.data.company.number,
                            blurb: res.data.company.blurb,
                            geoCoor: res.data.company.geoCoor,
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

    updateDetails(name, value) {
        this.setState({[name]: value});
    }

    updateGeoCoor(newCoor) {
        this.setState({geoCoor: newCoor});
    }

    updateAddress(newAddress) {
        this.setState({address: newAddress});
    }

    handleChange(name, e) {
        this.setState({[name]: e.target.value});
    }
   
    createNewOffer(name, requirements, expiry) {
        let me = this;

        $.ajax({
            method: 'POST',
            data: {
                token: this.props.token,
                action: 'insertOffer',
                data: JSON.stringify({companyId: this.props.companyId, name: name, requirements: requirements, expiry: expiry})
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
                requirements: requirements,
                expiryDate: expiry}],
            offerName: "", requirements: "", offerExpiry: ""
        })
    } 

    switchTab(index) {
        this.setState({tab: index, newOffer: false});
    }

    isSubmitable() {
        return isValidString(this.state.name) && isValidString(this.state.address) && isValidString(this.state.geoCoor);
    }

    onClickUpdate() {
        if(this.isSubmitable()) {
            let me = this;
            
            $.ajax({
                method: 'POST',
                data: {
                    token: this.props.token,
                    action: 'updateCompany',
                    data: JSON.stringify({companyId: this.props.companyId, name: this.state.name, address: this.state.address, geoCoor: this.state.geoCoor, number: this.state.number, blurb: this.state.blurb})
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

    handleUpdateLogo(newLogo) {
        this.setState({logo:newLogo});
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
                                <div className={"dashboard__tab " + (this.state.tab === 0 ? 'selected' : 'unselected')} onClick={() => this.switchTab(0)}>Organisation Details</div>
                                <div className={"dashboard__tab " + (this.state.tab === 1 ? 'selected' : 'unselected')} onClick={() => this.switchTab(1)}>Location</div>
                                <div className={"dashboard__tab " + (this.state.tab === 2 ? 'selected' : 'unselected')} onClick={() => this.switchTab(2)}>Tasks</div>
                                {this.state.tab !== 2 ? (<div className="dashboard__update"><button className="form__submit-button" onClick={this.onClickUpdate}>Update</button></div>) : (<div></div>)}
                            </div>
                                {this.state.tab === 0 ? (
                                    <DashboardDetails  token={this.props.token} 
                                                       companyId={this.props.companyId} 
                                                       name={this.state.name} 
                                                       address={this.state.address} 
                                                       number={this.state.number} 
                                                       blurb={this.state.blurb} 
                                                       email={this.state.email}
                                                       logo={this.state.logo} 
                                                       handleUpdateLogo={this.handleUpdateLogo}
                                                       updateDetails={this.updateDetails}
                                                       showFlashNotification={this.props.showFlashNotification} />
                                ) : (
                                this.state.tab === 1 ? (
                                    <LocationMap address={this.state.address} newAddress={this.updateAddress} geoCoor={this.state.geoCoor} newGeoCoor={this.updateGeoCoor} />
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
            {/* <Footer /> */}
            </div>
        );
    }
}

export default withRouter(Dashboard);
