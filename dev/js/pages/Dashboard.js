import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

class Dashboard extends Component {
	constructor(props) {
        super(props);

	    this.onClickLogout = this.onClickLogout.bind(this);
	}

	onClickLogout() {
		var me = this;

		$.ajax({
            method: 'POST',
            data: {
                token: this.props.token,
                action: 'logoutCompany'
            },
            url: 'public/process.php',
            success: function(res) {
				let { history } = me.props;
			    history.push('/');
            },
            error: function(res) {
                console.log(res);
            }
        });
	}

	render() {
		return (
            <div>
                <div>You are now logged in.</div>
            	<button onClick={this.onClickLogout}>Log Out</button>
            </div>
		);
	}
}

export default withRouter(Dashboard);