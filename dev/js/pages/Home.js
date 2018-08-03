import React, { Component } from 'react';
import $ from 'jquery';
import { Link, withRouter } from 'react-router-dom';
import {openSnackbar} from '../components/FlashNotification';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    showFlashNotification() {
        openSnackbar({ message: 'This is a message.' });
    }
    
    render() {
        let logInButton, registrationButton, dashboardButton;
        if(this.props.isLoggedIn) {
            logInButton = null;
            registrationButton = null;
            dashboardButton = <Link to="/dashboard">
                                  <button style={{"height":"30px","width":"100px", "backgroundColor":"red", "cursor":"pointer"}}>Dashboard</button>
                              </Link>
        }
        else {
            logInButton = <Link to="/company-login">
                              <button style={{"height":"30px","width":"100px", "backgroundColor":"darkgrey", "cursor":"pointer"}}>Log In</button>
                          </Link>;
            registrationButton = <Link to="/company-registration">
                                     <button style={{"height":"30px","width":"100px", "backgroundColor":"orange", "cursor":"pointer"}}>Registration</button>
                                 </Link>   
            dashboardButton = null;                            
        }

		return (
            <div className="contain">               
                <Header isLoggedIn={this.props.isLoggedIn}/>
                <div className="content-contain">
                    {dashboardButton}
                    {registrationButton}
                    {logInButton}
                    <Link to="/donate">
                        <button style={{"height":"30px","width":"100px", "backgroundColor":"blue", "cursor":"pointer"}}>Donate</button>
                    </Link>
                    <button style={{"height":"30px","width":"180px", "backgroundColor":"red", "cursor":"pointer"}} onClick={this.showFlashNotification}>show Notification </button>
                </div>
                <Footer />
            </div>
		);
	}
}

export default withRouter(Home);
