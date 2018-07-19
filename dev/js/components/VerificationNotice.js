import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class VerificationNotice extends Component {
    render() {
        let status = this.props.verificationStatus;
        return(
            <div className={"verify-email__container " + (status ? "success": "fail")}>
                <div className={"verify-email__icon " + (status ? "success": "fail")}>
                    <i className={"far " + (status ? "fa-thumbs-up" : "fa-thumbs-down")}></i>
                </div>
                <div className="verify-email__status">{this.props.title}</div>
                <div className="verify-email__sub-status">{this.props.subTitle}</div>
                <div className="verify-email__button">
                    <Link to={this.props.linkLocation}>
                        <div className="pl-button--style-1">{this.props.linkText}</div>
                    </Link>
                </div>
            </div>
        );
    }
}
