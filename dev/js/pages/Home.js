import React, { Component } from 'react';
import $ from 'jquery';

import SayHello from '../components/SayHello';
import PreLoader from '../components/PreLoader';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            message: 'Hello World'
        };

        this.registerCompany = this.registerCompany.bind(this);
    }

    registerCompany() {
        $.ajax({
            method: 'POST',
            data: {
                token: this.props.token,
                action: 'registerCompany',
                data: JSON.stringify({name: 'ian', email: 'ian@goyeti.ie', address: 'thomastown', password: '1234pass$'})
            },
            url: 'public/process.php',
            success: function(res) {
                res = JSON.parse(res);
                console.log(res.message);
            },
            error: function(res) {
                console.log(res);
            }
        });
    }

	render() {
		return (
            <div>
                <SayHello />
                
                <div>
                    <Link to="/pl">
                        <span style={{"height":"20px","width":"50px", "backgroundColor":"green", "display":"inline-block"}}></span>
                    </Link>

                    <Link to="/secret-page">
                        <span style={{"height":"20px","width":"50px", "backgroundColor":"red", "display":"inline-block"}}></span>
                    </Link>

                    <span style={{"height":"20px","width":"50px", "backgroundColor":"blue", "display":"inline-block"}} onClick={this.registerCompany}></span>

                    <Link to="/company-registration">
                        <span style={{"height":"20px","width":"50px", "backgroundColor":"orange", "display":"inline-block"}}></span>
                    </Link>
                </div>
            </div>
		);
	}
}