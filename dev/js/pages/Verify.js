import React, {Component} from 'react';
import EmailVerificationNotice from '../components/EmailVerificationNotice';
import PreLoader from '../components/PreLoader';
import qs from 'query-string';
import $ from 'jquery';

export default class Verify extends Component {
    
    constructor(props) {
        super(props);
        
        // Get query params from URL
        //Sample URL: practically-limitless.herokuapp.com/verify?email=ian@goyeti.ie&token=c1c69de13a5e03e7e85fcc391014ae2bddebb3925e78bbe7d7c33c82eb2ffdad  
        let userEmail = qs.parse(this.props.location.search).email;
        let userToken = qs.parse(this.props.location.search).token;	
        
        // initialise state
        this.state = {
            email: userEmail,
            token: userToken,
            verificationStatus: false,
            checkComplete: false
        }
        
        this.checkVerification = this.checkVerification.bind(this);
    }

    componentDidMount() {

        // if query params are present, begin verification check.
        if(this.state.email && this.state.token) {   
            this.checkVerification();
        } else {
            this.setState({
                checkComplete: true
            });
        }
    }
    
    checkVerification() {

        let me = this;
        let tkn = $('#session-token').val();

        setTimeout(function(){ 
            $.ajax({
                method: 'POST',
                data: {
                    token: tkn,
                    action: 'activateCompany',
                    data: JSON.stringify({email: me.state.email, token: me.state.token})
                },
                url: 'public/process.php',
                success: function(res) {
                    if(res.responseCode === 200) {
                        me.setState({
                            verificationStatus: true,
                            checkComplete: true
                        });
                    } else {
                        me.setState({
                            checkComplete: true
                        });
                    }
                    
                },
                error: function(res) {
                    me.setState({
                        checkComplete: true
                    });
                }
            });
            
        }, 500);


    }

    render() {
        return(
            <div className="verify-page__container">
                {this.state.checkComplete ? (
                    <EmailVerificationNotice verificationStatus={this.state.verificationStatus}/>
                ) : (
                    <PreLoader />
                )}
            </div>
        );
    }
}
