import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import PreLoader from '../components/PreLoader';

class Dashboard extends Component {
	constructor(props) {
        super(props);
 		
 		this.state = {
            checkComplete: false,
            name: null,
            email: null,
            address: null
        }

	    this.onClickLogout = this.onClickLogout.bind(this);
	}

	componentDidMount() {
		var me = this;
        $.ajax({
            method: 'POST',
            data: {
                token: this.props.token,
                action: 'fetchCompany',
                data: JSON.stringify({companyId: this.props.companyId})
            },
            url: 'public/process.php',
            success: function(res) {
                setTimeout(function() { 
                    res = JSON.parse(res);

                    if(res.responseCode === 200) {
                        me.setState({
                        	name: res.data.name,
                        	email: res.data.email,
                        	address: res.data.address,
                            checkComplete: true
                        });
                    } else {
                        me.setState({
                            checkComplete: true
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

	onClickLogout() {
		let { history } = this.props;

        this.props.setLoggedOut();
		history.push('/');
	}

    render() {
        return (
            <div>
                {this.state.checkComplete ? (
                	<div className="form__container">
                        <div className="form-header">Logged In Company</div>
                        <div className="form-body">
                            <div className="form-input__section">
                                <input type="text" placeholder="Company Name" className="form-input__value" value={this.state.name} readOnly/>
                            </div>
                            <div className="form-input__section">
                                <input type="text" placeholder="Company Address" className="form-input__value" value={this.state.address} readOnly/>
                            </div>
                            <div className="form-input__section">
                                <input type="email" placeholder="E-mail Address" className="form-input__value" value={this.state.email} readOnly/>
                            </div>    
                            <div className="form-submission__section">
                                <button className="form__submit-button" onClick={this.onClickLogout}>Log Out</button>
                            </div>    
                        </div>
                    </div>
                ) : (
                    <PreLoader />
                )}
            </div>
        );
    }
}

export default withRouter(Dashboard);