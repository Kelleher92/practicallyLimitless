import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {openSnackbar} from '../components/FlashNotification';

class Header extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        }
        this.handleLogoClick = this.handleLogoClick.bind(this);
        this.handleLogOutClick = this.handleLogOutClick.bind(this);
        this.handleNotificationClick = this.handleNotificationClick.bind(this);
    }
    
    handleLogoClick() {
        this.props.history.push('/home');
    }
    
    handleLogOutClick() {
        let { history } = this.props;
        this.props.setLoggedOut();
        history.push('/');
    }
    
    handleNotificationClick() {
        openSnackbar({ message: 'Opened a flash message' });
    }
    
    renderNav() {
        if(!this.props.isLoggedIn) return <div className="header__nav__container" />;
        return (
            <div className="header__nav__container">
                {/*<Link to="/dashboard"><div className="header__nav__item">Dashboard</div></Link>*/}
            </div>
        );
    }
    
    render() {
        let UserlogInButton, registerButton, logOutButton = null;
        
        if(!this.props.isLoggedIn) {
            UserlogInButton = <Link to="/user-login"><button className="pl-button--style-2 off-white">Log In</button></Link>;
            registerButton = <Link to="/user-registration"><button className="pl-button--style-2 orange">Sign Up</button></Link>;
        } else {
            logOutButton = <button className="pl-button--style-2 off-white" onClick={this.handleLogOutClick}>Log Out</button>;
        }
        
        return (
            <div className={"header__container " + (this.props.includeShadow ?"":"no-shadow")}>
                <div className="header__logo--wrapper">
                    <img className="header__logo" src='../public/images/logo.ico' onClick={this.handleLogoClick} />
                </div>
                {this.renderNav()}
                <div className="header__buttons">
                    {UserlogInButton}
                    {registerButton}
                    {logOutButton}
                    <Link to="/company-login">
                        <button className="pl-button--style-3 off-black header__nav__item">Charity?</button>
                    </Link>
                    {/*<i className="header__buttons__notify fas fa-bell" onClick={this.handleNotificationClick}></i>*/}
                </div>
            </div>
        );
    }
}

export default withRouter(Header);