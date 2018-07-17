import React, {Component} from 'react';
import EmailVerificationNotice from '../components/EmailVerificationNotice';

export default class VerifyEmail extends Component {
    
    // constructor() {
    //     super();
    //     this.state = {
    //         test: 'test'
    //     };
    // }
    
    render() {
        return(
            <EmailVerificationNotice />
        );
    }
}

