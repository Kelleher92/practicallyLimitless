import React, {Component} from 'react';
import EmailVerificationNotice from '../components/EmailVerificationNotice';
import qs from 'query-string';

export default class Verify extends Component {
    constructor(props) {
        super(props);
        
        //Sample URL: practically-limitless.herokuapp.com/verify?email=ian@goyeti.ie&token=c1c69de13a5e03e7e85fcc391014ae2bddebb3925e78bbe7d7c33c82eb2ffdad  
        let email = qs.parse(this.props.location.search).email;
        let token = qs.parse(this.props.location.search).token;
        let status = false;
        if(email && token) {   
            status = true;
        }	

        this.state = {
            verificationStatus: status
        }

    }

    render() {

        // let email = qs.parse(this.props.location.search).email;
        // let token = qs.parse(this.props.location.search).token;

        return(
            <div className="verify-page__container">
                <EmailVerificationNotice verificationStatus={this.state.verificationStatus}/>
            </div>
        );
    }
}

