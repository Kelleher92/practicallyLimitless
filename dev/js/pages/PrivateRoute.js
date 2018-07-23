import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import $ from 'jquery';

class PrivateRoute extends Component {
	constructor(props) {
		super(props);

        var hasAuthBeenChecked = false;
	}

	render() {
        const {component: Component, ...rest} = this.props;
        return (
            <Route {...rest} render={ props =>
                this.props.isLoggedIn ? ( <Component {...this.props} /> ) : (
                    <Redirect
                        to={{
                            pathname: "/"
                        }}
                    />
                )
            }/>
        )
	}
}

export default withRouter(PrivateRoute);