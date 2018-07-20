import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, browserHistory, Route, Switch } from 'react-router-dom';
import $ from 'jquery';

import Home from './pages/Home'; 
import PrivateRoute from './pages/PrivateRoute';
import Verify from './pages/Verify';
import Reset from './pages/Reset';
import Dashboard from './pages/Dashboard';
import PreLoader from './components/PreLoader';
import CompanyRegistration from './components/CompanyRegistration.js';
import CompanyLogin from './components/CompanyLogin.js';
import ForgotPassword from './components/ForgotPassword.js';
import ResetPassword from './components/ResetPassword.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: $('#login-token').val() === 'true'
        };

        this.token = $('#session-token').val();
        this.setLoggedOut = this.setLoggedOut.bind(this);
    }   

    setLoggedIn() {
        this.setState({isLoggedIn: true});
    } 

    setLoggedOut() {
        $.ajax({
            method: 'POST',
            data: {
                token: this.token,
                action: 'logoutCompany'
            },
            url: 'public/process.php',
            success: function(res) {
                console.log(res);
            },
            error: function(res) {
                console.log(res);
            }
        });

        this.setState({isLoggedIn: false});
    } 

	render() {
		return (
            <Router>
    			<div>
                    <Switch>
                        <Route exact={true} path="/(|home)" render={(props) => (
                            <Home {...props} token={this.token} />
                        )}/>
                        
                        <Route exact={true} path="/pl" render={() => (
                            <PreLoader  />
                        )}/>
                        <Route exact={true} path="/company-registration" render={() => (
                            <CompanyRegistration token={this.token}/>
                        )}/>

                        <Route exact={true} path="/company-login" render={() => (
                            <CompanyLogin token={this.token} setLoggedIn={this.setLoggedIn}/>
                        )}/>

                        <Route exact={true} path="/company-forgot-password" render={() => (
                            <ForgotPassword token={this.token}/>
                        )}/>

                        <Route exact={true} path="/company-reset-password" render={(props) => (
                            <ResetPassword {...props} token={this.token} />
                        )} />

                        <Route exact={true} path="/verify" render={(props) => (
                            <Verify {...props} token={this.token} />
                        )} />

                        <Route exact={true} path="/reset" render={(props) => (
                            <Reset {...props} token={this.token} />
                        )} />

                        <PrivateRoute path="/dashboard" token={this.token} component={Dashboard} isLoggedIn={this.state.isLoggedIn} setLoggedOut={this.setLoggedOut}/>
                    </Switch>
    	    	</div>
            </Router>
		);
	}
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);