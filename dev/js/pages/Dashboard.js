import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {
	constructor(props) {
        super(props);

	    this.onClickLogout = this.onClickLogout.bind(this);
	}

	onClickLogout() {
		let { history } = this.props;
	    history.push('/');
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