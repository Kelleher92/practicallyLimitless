import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

class Dashboard extends Component {
	constructor(props) {
        super(props);

	    this.onClickLogout = this.onClickLogout.bind(this);
	}

	onClickLogout() {
		let { history } = this.props;

        this.props.setLoggedOut();
		history.push('/');
	}

	render() {
		return (
            <div>
                <div>You are now logged in.</div>
            	<button style={{"height":"30px","width":"100px", "cursor":"pointer"}} onClick={this.onClickLogout}>Log Out</button>
            </div>
		);
	}
}

export default withRouter(Dashboard);