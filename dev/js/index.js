import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, browserHistory, Route, Switch } from 'react-router-dom';
import $ from 'jquery';

import Modal from './components/Modal';
import CancelModal from './components/CancelModal';
import ModalContentsGeneric from './components/ModalContentsGeneric';
import Home from './pages/Home'; 
import PrivateRoute from './pages/PrivateRoute';
import Verify from './pages/Verify';
import UserVerify from './pages/UserVerify';
import Reset from './pages/Reset';
import UserReset from './pages/UserReset';
import Dashboard from './pages/Dashboard';
import UserDashboard from './pages/UserDashboard';
import PreLoader from './components/PreLoader';
import CompanyRegistration from './pages/CompanyRegistration.js';
import UserRegistration from './pages/UserRegistration.js';
import CompanyLogin from './pages/CompanyLogin.js';
import UserLogin from './pages/UserLogin.js';
import ForgotPassword from './pages/ForgotPassword.js';
import UserForgotPassword from './pages/UserForgotPassword.js';
import ResetPassword from './pages/ResetPassword.js';
import UserResetPassword from './pages/UserResetPassword.js';
import FlashNotification, {openSnackbar} from './components/FlashNotification';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Donate from './pages/Donate';
import VerificationNotice from './components/VerificationNotice';
import CompanyLogo from './components/CompanyLogo';

class App extends Component {
    constructor() {
        super();
        this.token = $('#session-token').val();
        this.companyId = $('#login-token').val();
        
        this.state = {
            isLoggedIn: false,
            companyId: this.companyId,
            showModal: false,
            modalType: '',
            modalVerificationStatus: false,
            modalTitle: '', 
            modalSubTitle: '',
            modalLinkText: '',
            modalLinkLocation: ''
        };
        
        this.setLoggedOut = this.setLoggedOut.bind(this);
        this.setLoggedIn = this.setLoggedIn.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);
    }   

    componentWillMount() {
        window.callback = (loggedInState, Id = null) => {
            this.setState({companyId: Id});
            this.setState({isLoggedIn: loggedInState}); 
        };

        $.ajax({
            method: 'POST',
            data: {
                token: this.token,
                action: 'checkLoggedIn'
            },
            url: 'public/process.php',
            success: function(res) {
                res = JSON.parse(res);
                window.callback(res.result, res.companyId);
            },
            error: function(res) {
                window.callback(false);
            }
        });
    }

    setLoggedIn(email, password) {
        let me = this;
        return $.ajax({
            method: 'POST',
            data: {
                token: this.token,
                action: 'loginCompany',
                data: JSON.stringify({email: email, password: password})
            },
            url: 'public/process.php',
            success: function(res) {
                res = JSON.parse(res);

                if(res.responseCode === 200) {
                    window.callback(true, res.data);
                } else {
                    window.callback(false);
                }
            },
            error: function(res) {
                me.showFlashNotification(res);
            }
        });
    } 

    setLoggedInUser(email, password) {
        let me = this;
        return $.ajax({
            method: 'POST',
            data: {
                token: this.token,
                action: 'loginUser',
                data: JSON.stringify({email: email, password: password})
            },
            url: 'public/process.php',
            success: function(res) {
                res = JSON.parse(res);

                if(res.responseCode === 200) {
                    window.callback(true, res.data);
                } else {
                    window.callback(false);
                }
            },
            error: function(res) {
                me.showFlashNotification(res);
            }
        });
    } 

    setLoggedOut() {
        let me = this;
        $.ajax({
            method: 'POST',
            data: {
                token: this.token,
                action: 'logoutUser'
            },
            url: 'public/process.php',
            success: function(res) {
                window.callback(false);
            },
            error: function(res) {
                me.showFlashNotification(res);
                window.callback(false);
            }
        });
    } 

    showFlashNotification(message) {
        openSnackbar({message: message});
    }

    handleShowModal(modalType, modalParams) {
        if(!modalParams) {
            modalParams = {};
        }

        let newState = {
            showModal: true,
            modalType: modalType,
            modalVerificationStatus: modalParams.modalVerificationStatus || true,
            modalTitle: modalParams.modalTitle || 'success!', 
            modalSubTitle: modalParams.modalSubTitle || 'no errors found',
            modalLinkText: modalParams.modalLinkText || 'Home',
            modalLinkLocation: modalParams.modalLinkLocation || '/home'
        };

        this.setState(newState);
    }
      
    handleHideModal() {
        this.setState({showModal: false});
    }

    renderModal() {
        if(this.state.modalType === 'genericModal') {
            return(
                <Modal hide={this.handleHideModal}>
                    <ModalContentsGeneric handleHideModal={this.handleHideModal} />
                </Modal>
            );
        } 
        else if(this.state.modalType === 'successModal') {
            return(
                <Modal hide={this.handleHideModal}>
                    <VerificationNotice 
                        verificationStatus={true} 
                        title={this.state.modalTitle} 
                        subTitle={this.state.modalSubTitle}  
                        linkText={this.state.modalLinkText}
                        linkLocation={this.state.modalLinkLocation} />
                </Modal>
            );
        }
        else {
            return (
                <Modal hide={this.handleHideModal}>
                    <div>Error rendering modal</div>
                </Modal>
                )
            }
        }

	render() {
		return (
            <MuiThemeProvider>
                <Router>
                    <div className="contain">
                        <Switch>
                            <Route exact={true} path="/(|home)" render={(props) => (
                                <Home {...props} token={this.token} isLoggedIn={this.state.isLoggedIn} setLoggedOut={this.setLoggedOut} />
                            )}/>
                            
                            <Route exact={true} path="/pl" render={() => (
                                <PreLoader />
                            )}/>
                            
                            <Route exact={true} path="/user-registration" render={(props) => (
                                <UserRegistration {...props} token={this.token} handleShowModal={this.handleShowModal} handleHideModal={this.handleHideModal} />
                            )}/>

                            <Route exact={true} path="/company-registration" render={(props) => (
                                <CompanyRegistration {...props} token={this.token} handleShowModal={this.handleShowModal} handleHideModal={this.handleHideModal} />
                            )}/>

                            <Route exact={true} path="/company-login" render={(props) => (
                                <CompanyLogin {...props} token={this.token} setLoggedIn={this.setLoggedIn} showFlashNotification={this.showFlashNotification} />
                            )}/>

                            <Route exact={true} path="/user-login" render={(props) => (
                                <UserLogin {...props} token={this.token} setLoggedInUser={this.setLoggedInUser} showFlashNotification={this.showFlashNotification} />
                            )}/>

                            <Route exact={true} path="/company-forgot-password" render={(props) => (
                                <ForgotPassword {...props} token={this.token} />
                            )}/>

                            <Route exact={true} path="/user-forgot-password" render={(props) => (
                                <UserForgotPassword {...props} token={this.token} />
                            )}/>

                            <Route exact={true} path="/company-reset-password" render={(props) => (
                                <ResetPassword {...props} token={this.token} />
                            )} />

                            <Route exact={true} path="/user-reset-password" render={(props) => (
                                <UserResetPassword {...props} token={this.token} />
                            )} />
                            
                            <Route exact={true} path="/donate" render={(props) => (
                                <Donate {...props} token={this.token} isLoggedIn={this.state.isLoggedIn} setLoggedOut={this.setLoggedOut} />
                            )} />

                            <Route exact={true} path="/verify" render={(props) => (
                                <Verify {...props} token={this.token} />
                            )} />

                            <Route exact={true} path="/user-verify" render={(props) => (
                                <UserVerify {...props} token={this.token} />
                            )} />
                         
                            <Route exact={true} path="/reset" render={(props) => (
                                <Reset {...props} token={this.token} />
                            )} />

                            <Route exact={true} path="/user-reset" render={(props) => (
                                <UserReset {...props} token={this.token} />
                            )} />

                            <Route exact={true} path="/company-logo" render={(props) => (
                                <CompanyLogo {...props} token={this.token} companyId={this.state.companyId}/>
                            )} />

                            <PrivateRoute path="/dashboard" token={this.token} component={Dashboard} isLoggedIn={this.state.isLoggedIn} companyId={this.state.companyId} setLoggedOut={this.setLoggedOut} showFlashNotification={this.showFlashNotification} />
                        
                            <PrivateRoute path="/user-dashboard" token={this.token} component={UserDashboard} isLoggedIn={this.state.isLoggedIn} companyId={this.state.companyId} setLoggedOut={this.setLoggedOut} showFlashNotification={this.showFlashNotification} />
                        
                        </Switch>
                        <FlashNotification />
                        {this.state.showModal ? this.renderModal() : null}
                    </div>
                </Router>
            </MuiThemeProvider>
        );
	}
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);