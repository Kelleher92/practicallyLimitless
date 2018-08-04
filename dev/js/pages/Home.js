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

		return (
            <div className="contain">               
                <Header isLoggedIn={this.props.isLoggedIn} setLoggedOut={this.props.setLoggedOut}/>
                <div className="content-contain">
                    Put public facing web content here.
                </div>
                <Footer />
            </div>
		);
	}
}

export default withRouter(Home);
