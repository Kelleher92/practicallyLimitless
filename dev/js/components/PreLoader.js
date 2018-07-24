import React, { Component } from 'react';

// export default class PreLoader extends Component {
// 	render() {
// 		return (
// 			<div style={{"height":"100%"}} className="d-flex justify-content-center align-items-center">
// 				<div className="preloader-lane">
// 					<div className="preloader-inside"></div>
// 				</div>
// 			</div>
// 		);
// 	}
// }

export default class PreLoader extends Component {
	render() {
		return(
			<div className="form__container">
			    <div className="form-logo"></div>
	            <div className="pre-loader-bounce__wrapper">
	                <div className="pre-loader-bounce__balls"></div> 
	            </div>
            </div>
		);
	}
}