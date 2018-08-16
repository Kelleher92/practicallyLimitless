import React, { Component } from 'react';
import $ from 'jquery';
import { Link, withRouter } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
		return (
            <div className="contain">               
                <Header isLoggedIn={this.props.isLoggedIn} setLoggedOut={this.props.setLoggedOut} includeShadow={false}/>
                <div className="home-contain justify-content-center">
                    {/*}<div className="home__section1__container">
                        <div className="home__section1__text__wrap">
                            A platform for <span>change.</span>
                        </div>
                        <div className="home__section1__image">
                        </div>
                    </div> */}
                </div>
                <Footer />
            </div>
		);
	}
}

export default withRouter(Home);