import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { isValidString } from '../helpers/utils.js';
import $ from 'jquery';
import PreLoader from '../components/PreLoader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserDashboardTable from '../components/UserDashboardTable';
import UserDashboardDetails from '../components/UserDashboardDetails';
import AccountDashboardDetails from '../components/AccountDashboardDetails';

class UserDashboard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            checkComplete: false,
            name: '',
            email: '',
            number: '',
            blurb: '',
            logo: '',
            geoCoor: '',
            skills: '',
            offerName: '',
            offerExpiry: '',
            currentOffers: [],
            tab: 0,
            newOffer: false
        }
        
        this.onClickNew = this.onClickNew.bind(this);
        this.onClickUpdate = this.onClickUpdate.bind(this);
        this.switchTab = this.switchTab.bind(this);
        this.updateDetails = this.updateDetails.bind(this);
        this.updateGeoCoor = this.updateGeoCoor.bind(this);
        this.updateSkills = this.updateSkills.bind(this);
        this.handleUpdateLogo = this.handleUpdateLogo.bind(this);
    }
    
    componentDidMount() {
        var me = this;
        
        $.ajax({
            method: 'POST',
            data: {
                token: this.props.token,
                action: 'fetchUser',
                data: JSON.stringify({companyId: this.props.companyId})
            },
            url: 'public/process.php',
            success: function(res) {
                setTimeout(function() { 
                    res = JSON.parse(res);
                    if(res.responseCode === 200) {
                        me.setState({
                            name: res.data.user.name,
                            email: res.data.user.email,
                            logo: res.data.user.logo,
                            number: res.data.user.number,
                            blurb: res.data.user.blurb,
                            geoCoor: res.data.user.geoCoor,
                            skills: res.data.user.skills,
                            currentOffers: res.data.currentOffers,
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
    
    updateSkills(newSkills) {
        this.setState({skills: newSkills});
    }
    
    handleChange(name, e) {
        this.setState({[name]: e.target.value});
    }
   
    switchTab(index) {
        this.setState({tab: index, newOffer: false});
    }
    
    isSubmitable() {
        return isValidString(this.state.name)  && isValidString(this.state.geoCoor);
    }
    
    onClickUpdate() {
        if(this.isSubmitable()) {
            let me = this;
            
            $.ajax({
                method: 'POST',
                data: {
                    token: this.props.token,
                    action: 'updateUser',
                    data: JSON.stringify({companyId: this.props.companyId, name: this.state.name, skills: this.state.skills, geoCoor: this.state.geoCoor, number: this.state.number, blurb: this.state.blurb})
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
                        <div className="form__container dash wide">
                            <div className="dashboard__tab-container d-flex">
                                <div className={"dashboard__tab " + (this.state.tab === 0 ? 'selected' : 'unselected')} onClick={() => this.switchTab(0)}>Profile</div>
                                <div className={"dashboard__tab " + (this.state.tab === 1 ? 'selected' : 'unselected')} onClick={() => this.switchTab(1)}>Account Settings</div>
                                <div className={"dashboard__tab " + (this.state.tab === 2 ? 'selected' : 'unselected')} onClick={() => this.switchTab(2)}>Current Opportunities</div>
                                {this.state.tab !== 2 ? (<div className="dashboard__update"><button className="form__submit-button" onClick={this.onClickUpdate}>Update</button></div>) : (<div></div>)}
                            </div>
                                {this.state.tab === 0 ? (
                                    <UserDashboardDetails  token={this.props.token} 
                                                       companyId={this.props.companyId} 
                                                       name={this.state.name} 
                                                       skills={this.state.skills}
                                                       blurb={this.state.blurb} 
                                                       email={this.state.email}
                                                       logo={this.state.logo} 
                                                       handleUpdateLogo={this.handleUpdateLogo}
                                                       updateDetails={this.updateDetails}
                                                       showFlashNotification={this.props.showFlashNotification} />
                                ) : (
                                this.state.tab === 1 ? (
                                    <AccountDashboardDetails  token={this.props.token} 
                                                       companyId={this.props.companyId} 
                                                       name={this.state.name} 
                                                       number={this.state.number} 
                                                       blurb={this.state.blurb} 
                                                       email={this.state.email}
                                                       logo={this.state.logo} 
                                                       handleUpdateLogo={this.handleUpdateLogo}
                                                       updateDetails={this.updateDetails}
                                                       showFlashNotification={this.props.showFlashNotification} />
                                    ) : (
                                (
                                    <UserDashboardTable active={this.state.currentOffers} onClickNew={this.onClickNew} />
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

export default withRouter(UserDashboard);
