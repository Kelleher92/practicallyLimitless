import React, { Component } from 'react';
import $ from 'jquery';

import PreLoader from '../components/PreLoader';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

	render() {
		return (
            <div>               
                <div>
                    <Link to="/pl">
                        <button style={{"height":"30px","width":"100px", "backgroundColor":"honeydew", "cursor":"pointer"}}>Spinner</button>
                    </Link>

                    <Link to="/dashboard">
                        <button style={{"height":"30px","width":"100px", "backgroundColor":"red", "cursor":"pointer"}}>Dashboard</button>
                    </Link>

                    <Link to="/company-registration">
                        <button style={{"height":"30px","width":"100px", "backgroundColor":"orange", "cursor":"pointer"}}>Registration</button>
                    </Link>
                    
                    <Link to="/company-login">
                        <button style={{"height":"30px","width":"100px", "backgroundColor":"darkgrey", "cursor":"pointer"}}>Log In</button>
                    </Link>
                </div>
            </div>
		);
	}
}