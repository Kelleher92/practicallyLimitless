import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        }

        this.handleLogoClick = this.handleLogoClick.bind(this);
    }

    handleLogoClick() {
        this.props.history.push('/home');
    }
    
    render() {
        return (
            <div className="header__container">
                <img className="logo" src='../public/images/pl-logo2.png' onClick={this.handleLogoClick} />
                <div className="header__buttons">
                    <Link to="/company-login">
                        <button className="pl-button--style-2 off-white">Log in</button>
                    </Link>
                    <Link to="/company-registration">
                        <button className="pl-button--style-2 orange">Sign Up</button>
                    </Link>
                    <Link to="/donate">
                        <button className="pl-button--style-3 off-black">Donate</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);