import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, browserHistory, Route, Switch } from 'react-router-dom';
import $ from 'jquery';

import Home from './pages/Home'; 
import PrivateRoute from './pages/PrivateRoute';
import Verify from './pages/Verify';
import Dashboard from './pages/Dashboard';
import PreLoader from './components/PreLoader';
import CompanyRegistration from './components/CompanyRegistration.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: $('#login-token').val() === 'true'
        };

        this.token = $('#session-token').val();
        this.setLoggedOut = this.setLoggedOut.bind(this);
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

                        <Route exact={true} path="/verify" render={(props) => (
                            <Verify {...props} token={this.token} />
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