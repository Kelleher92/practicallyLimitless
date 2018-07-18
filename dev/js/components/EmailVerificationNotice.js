import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class EmailVerificationNotice extends Component {
    render() {
        return(
            <div>
                {this.props.verificationStatus ? (
                    <div className="verify-email__container success">
                        <div className="verify-email__icon success">
                            <i className="far fa-thumbs-up"></i>
                        </div>
                        <div className="verify-email__status">success!</div>

                        <div className="verify-email__sub-status">You can now proceed to login</div>
                        <div className="verify-email__button">
                            <Link to="/home">
                                <div className="pl-button--style-1">Login</div>
                            </Link>
                        </div>
                    </div>
                
                ) : (

                    <div className="verify-email__container fail">
                        <div className="verify-email__icon fail">
                            <i className="far fa-thumbs-down"></i>
                        </div>
                        <div className="verify-email__status">error!</div>

                        <div className="verify-email__sub-status">Your verification has timed out. Please register again.</div>
                        <div className="verify-email__button">
                            <Link to="/home">
                                <div className="pl-button--style-1">Register</div>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
