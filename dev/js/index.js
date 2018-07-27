import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, browserHistory, Route, Switch } from 'react-router-dom';
import $ from 'jquery';

import Modal from './components/Modal';
import ModalContentsGeneric from './components/ModalContentsGeneric';
import Home from './pages/Home'; 
import PrivateRoute from './pages/PrivateRoute';
import Verify from './pages/Verify';
import Reset from './pages/Reset';
import Dashboard from './pages/Dashboard';
import PreLoader from './components/PreLoader';
import CompanyRegistration from './components/CompanyRegistration.js';
import CompanyLogin from './components/CompanyLogin.js';
import ForgotPassword from './components/ForgotPassword.js';
import ResetPassword from './components/ResetPassword.js';
import FlashNotification, {openSnackbar} from './components/FlashNotification';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import VerificationNotice from './components/VerificationNotice';

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
                console.log(res);
            }
        });
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
                window.callback(false);
            },
            error: function(res) {
                console.log(res);
                window.callback(false);
            }
        });
    } 

    showFlashNotification() {
        openSnackbar({ message: 'Opened from the home page!' });
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
        if(this.state.modalType==='genericModal') {
            return(
                <Modal hide={this.handleHideModal}>
                    <ModalContentsGeneric handleHideModal={this.handleHideModal} />
                </Modal>
            );
        } 
        else if(this.state.modalType==='successModal') {
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
            return(<Modal hide={this.handleHideModal}><div>Error rendering modal</div></Modal>)
        }
    }

	render() {
		return (
            <div>
                <MuiThemeProvider>
                    <Router>
                        <div>
                            <Switch>
                                <Route exact={true} path="/(|home)" render={(props) => (
                                    <Home {...props} token={this.token} isLoggedIn={this.state.isLoggedIn} />
                                )}/>
                                
                                <Route exact={true} path="/pl" render={() => (
                                    <PreLoader />
                                )}/>
                                <Route exact={true} path="/company-registration" render={(props) => (
                                    <CompanyRegistration {...props} token={this.token} handleShowModal={this.handleShowModal} handleHideModal={this.handleHideModal} />
                                )}/>

                                <Route exact={true} path="/company-login" render={(props) => (
                                    <CompanyLogin {...props} token={this.token} setLoggedIn={this.setLoggedIn} />
                                )}/>

                                <Route exact={true} path="/company-forgot-password" render={(props) => (
                                    <ForgotPassword {...props} token={this.token} />
                                )}/>

                                <Route exact={true} path="/company-reset-password" render={(props) => (
                                    <ResetPassword {...props} token={this.token} />
                                )} />

                                <Route exact={true} path="/verify" render={(props) => (
                                    <Verify {...props} token={this.token} />
                                )} />

                                <Route exact={true} path="/reset" render={(props) => (
                                    <Reset {...props} token={this.token} />
                                )} />

                                <PrivateRoute path="/dashboard" token={this.token} component={Dashboard} isLoggedIn={this.state.isLoggedIn} companyId={this.state.companyId} setLoggedOut={this.setLoggedOut}/>
                            </Switch>
                            <FlashNotification />
                            {this.state.showModal ? this.renderModal() : null}
                        </div>
                    </Router>
                </MuiThemeProvider>
            </div>
        );
	}
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);