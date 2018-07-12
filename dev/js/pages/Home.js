/*
 * @Author: Thomas Moran 
 * @Date: 2018-07-11 16:22:49 
 * @Last Modified by: Thomas Moran
 * @Last Modified time: 2018-07-12 10:09:49
 */


// ========= Dependencies =========
import React, { Component } from 'react';

// ========= Components =========
import SayHello from '../components/SayHello';
import PreLoader from '../components/PreLoader';
import { Link } from 'react-router-dom';


export default class Home extends Component {

    constructor() {
        super();
        this.state = {
            message: 'Hello World'
        };
    }
    

	render() {

		return (
            <div>
                <SayHello />
                <PreLoader />
                
                <div style={{"height":"40px", "backgroundColor":"yellow"}} >
                    <Link to="/pl">
                        <span style={{"height":"20px","width":"20px", "backgroundColor":"green", "display":"inline-block"}} ></span>
                        <span style={{"height":"20px","width":"20px", "backgroundColor":"blue", "display":"inline-block"}} ></span>
                    </Link>
                </div>
            </div>
		);
	}
}
