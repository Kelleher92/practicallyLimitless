import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import {openSnackbar} from '../components/FlashNotification';

export default class Home extends Component {
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
            <div>               
                <div>
                    {dashboardButton}
                    {registrationButton}
                    {logInButton}
                    <Link to="/donate">
                        <button style={{"height":"30px","width":"100px", "backgroundColor":"blue", "cursor":"pointer"}}>Donate</button>
                    </Link>
                    <button className="btn btn-danger" onClick={this.showFlashNotification}>show Notification </button>
                </div>
            </div>
		);
	}
}
