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
                <div className="home-contain">
                    <div className="home__section--title">What We Do</div>
                    <div className="home__step__wrapper">
                        <div className="home__step">
                            <div className="home__step__icon green"><i className="fas fa-pencil-alt"></i></div>
                            <div className="home__step__title">1. Sign Up</div>
                            <div className="home__step__description">
                                Enter you details, experience, availability, skills, favourite 
                                catagories, and more in order to help us find you the best ways to help.
                            </div>
                        </div>
                        <div className="home__step">
                            <div className="home__step__icon pink"><i className="fas fa-hand-pointer"></i></div>
                            <div className="home__step__title">2. Apply</div>
                            <div className="home__step__description">
                                Choose the volunteering task that is right for you. Simply click Apply and then the charity will contact you if you are a match!
                                <br/><br/>
                                Tasks can range from professional services, to transport, to painting and decorating.
                            </div>
                        </div>
                        <div className="home__step">
                            <div className="home__step__icon orange"><i className="fas fa-hands-helping"></i></div>
                            <div className="home__step__title">3. Help</div>
                            <div className="home__step__description">
                                Once you are accepted, you can complete your volunteering task as required.
                                <br/><br/>
                                Why not share on Social Media and keep the trend of helping each other out going? 
                            </div>
                        </div>
                    </div>
                    <div className="home__button--wrap">
                        <button className="pl-button--style-4"><Link to="/user-registration">Get Started</Link></button>
                    </div>
                </div>
                <Footer />
            </div>
		);
	}
}

export default withRouter(Home);
