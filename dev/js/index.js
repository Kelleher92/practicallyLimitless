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
import PreLoaderBounce from './components/PreLoaderBounce';
import CompanyRegistration from './components/CompanyRegistration.js';
import CompanyLogin from './components/CompanyLogin.js';
import ForgotPassword from './components/ForgotPassword.js';
import ResetPassword from './components/ResetPassword.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false
        };

        this.token = $('#session-token').val();
        
        this.setLoggedOut = this.setLoggedOut.bind(this);
        this.setLoggedIn = this.setLoggedIn.bind(this);
    }   

    componentWillMount() {
        window.callback = (loggedInState) => {
            this.setState({isLoggedIn: loggedInState});  
        };

        $.ajax({
            method: 'POST',
            data: {
                token: this.token,
                action: 'checkLoggedIn'
            },
            url: 'public/process.php',
            success: function(res) {
                res = JSON.parse(res);
                window.callback(res.result);
            },
            error: function(res) {
                window.callback(false);
            }
        });
    }

    setLoggedIn(email, password) {
        $.ajax({
            method: 'POST',
            data: {
                token: this.token,
                action: 'loginCompany',
                data: JSON.stringify({email:email, password: password})
            },
            url: 'public/process.php',
            success: function(res) {
                res = JSON.parse(res);

                if(res.responseCode === 200) {
                    window.callback(true);
                } else {
                    window.callback(false);
                    alert(res.message);
                }
            },
            error: function(res) {
                console.log(res);
                window.callback(false);
            }
        });
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
                window.callback(false);
            },
            error: function(res) {
                console.log(res);
                window.callback(false);
            }
        });
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
                            // <PreLoader />
                            <PreLoaderBounce />
                        )}/>
                        <Route exact={true} path="/company-registration" render={(props) => (
                            <CompanyRegistration {...props} token={this.token}/>
                        )}/>

                        <Route exact={true} path="/company-login" render={(props) => (
                            <CompanyLogin {...props} token={this.token} setLoggedIn={this.setLoggedIn}/>
                        )}/>

                        <Route exact={true} path="/company-forgot-password" render={(props) => (
                            <ForgotPassword {...props} token={this.token}/>
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