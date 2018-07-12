/*
 * @Author: Thomas Moran 
 * @Date: 2018-07-11 16:45:09 
 * @Last Modified by: Thomas Moran
 * @Last Modified time: 2018-07-11 17:51:16
 */


import React, { Component } from "react";
import { 
	Route, 
	Redirect, 
	// BrowserRouter as Router, 
	//Link, 
	withRouter 
} from "react-router-dom";

class PrivateRoute extends Component {
    
	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: true,
		}
	}

	// componentDidMount() {
	// 	// checkAuth();
	// 	let me = this;
	// 	let token = false; // this would be the session token from server


	// 	if(!token) {
	// 		me.setState({
	// 			isAuthenticated: false,
	// 		});
	// 	} else {
    //         // check server for authentication
    //         // set state to prove authentication status
    //         me.setState({
	// 			isAuthenticated: true
	// 		});
	// 	}

	// }

	render() {
        const {component: Component, ...rest} = this.props;
        
        return (
            <Route {...rest} render={ props =>
                this.state.isAuthenticated ? ( <Component {...this.props} /> ) : (
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