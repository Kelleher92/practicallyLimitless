/*
 * @Author: Thomas Moran 
 * @Date: 2018-07-11 16:23:04 
 * @Last Modified by: Thomas Moran
 * @Last Modified time: 2018-07-17 23:55:13
 */

// ======== Dependencies ==========
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, browserHistory, Route, Switch } from 'react-router-dom';
import $ from 'jquery';

// ========= Pages ===============
import Home from './pages/Home'; 
import PrivateRoute from './pages/PrivateRoute';
import Verify from './pages/Verify';
import SecretPage from './pages/SecretPage';
import SayHello from './components/SayHello';
import PreLoader from './components/PreLoader';

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
            <Router >
    			<div>
                    <Switch>
                        <Route exact={true} path="/(|home)" render={() => (
                            <Home token={this.token}/>
                        )}/>
                        
                        <Route exact={true} path="/pl" render={() => (
                            <PreLoader />
                        )}/>
                        
                        <Route exact={true} path="/verify" component={Verify}/>

                        <PrivateRoute path="/secret-page" component={SecretPage} isLoggedIn={this.state.isLoggedIn} setLoggedOut={this.setLoggedOut}/>
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