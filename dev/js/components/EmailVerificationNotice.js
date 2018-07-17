import React, {Component} from 'react';


export default class EmailVerificationNotice extends Component {
    
    constructor() {
        super();
        this.state = {

        };

        // practically-limitless.herokuapp.com/verify?email=ian@goyeti.ie&token=c1c69de13a5e03e7e85fcc391014ae2bddebb3925e78bbe7d7c33c82eb2ffdad  
        // let url = new URL(window.location.href);
		// let code = url.searchParams.get("code");
    }
    
    render() {
        return(
            <div>
            <div class="verify-email__container success">
                <div class="verify-email__smiley success">
                    happy face
                </div>
                <div class="verify-email__status">
                    success
                </div>
                <div class="verify-email__sub-status">
                    You can now proceed to login
                </div>
                <div class="pl-input--style-1">
                    <input type="text" placeholder="Email" />
                </div>
                <div class="verify-email__button">
                    <div class="pl-button--style-1"><span>Log in</span></div>
                    <div class="pl-button--style-1"><span>Try gain</span></div>
                </div>
            </div>

            </div>
        );
    }
}

