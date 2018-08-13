import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import VerificationNotice from '../components/VerificationNotice';
import PreLoader from '../components/PreLoader';
import qs from 'query-string';
import $ from 'jquery';

class Reset extends Component {
    constructor(props) {
        super(props);
        
        // Get query params from URL
        let userEmail = qs.parse(this.props.location.search).email;
        let userToken = qs.parse(this.props.location.search).token;	
        
        // initialise state
        this.state = {
            email: userEmail,
            token: userToken,
            verificationStatus: false,
            checkComplete: false,
            title: "", 
            subTitle: "",
            linkText: "",
            linkLocation: ""
        }
        
        this.checkVerification = this.checkVerification.bind(this);
    }

    componentDidMount() {
        if(this.state.email && this.state.token) {   
            this.checkVerification();
        } else {
            this.setState({
                checkComplete: true,
                title: "Error!", 
                subTitle: "Oops... I think you have come here by mistake.",
                linkText: "Return Home",
                linkLocation: "/home"
            });
        }
    }
    
    checkVerification() {
        let me = this;
        let { history } = this.props;

        $.ajax({
            method: 'POST',
            data: {
                token: me.props.token,
                action: 'resetCompany',
                data: JSON.stringify({email: me.state.email, token: me.state.token})
            },
            url: 'public/process.php',
            success: function(res) {
                setTimeout(function() { 
                    res = JSON.parse(res);

                    if(res.responseCode === 200) {
                        history.push({
                            pathname: '/company-reset-password',
                            search: '?email=' + me.state.email
                        });
                    } else {
                        me.setState({
                            checkComplete: true,
                            title: "Error!", 
                            subTitle: "There was a verification error. Please enter your details again.",
                            linkText: "Forgot Password",
                            linkLocation: "/company-forgot-password"
                        });
                    }
                }, 500);
            },
            error: function(res) {
                setTimeout(function() { 
                    me.setState({
                        checkComplete: true
                    });
                }, 500);
            }
        });
    }

    render() {
        return (
            <div className="verify-page__container">
                {this.state.checkComplete ? (
                    <VerificationNotice 
                        verificationStatus={this.state.verificationStatus} 
                        title={this.state.title} 
                        subTitle={this.state.subTitle}  
                        linkText={this.state.linkText}
                        linkLocation={this.state.linkLocation} />
                ) : (
                    <PreLoader />
                )}
            </div>
        );
    }
}

export default withRouter(Reset);