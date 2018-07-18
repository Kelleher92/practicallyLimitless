import React, { Component } from 'react';

export default class SayHello extends Component {
    constructor() {
        super();
        this.state = {
            message: 'Hello World'
        };
    }

	render() {
		return (
            <div>
                {this.state.message}
            </div>
		);
	}
}