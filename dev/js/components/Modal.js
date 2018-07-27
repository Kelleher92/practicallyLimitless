import React, { Component } from 'react';
import ReactDOM from "react-dom";

const modalRoot = document.getElementById('modal-root');

// Let's create a Modal component that is an abstraction around
// the portal API.
export default class Modal extends Component {
    constructor(props) {
        super(props);
        // Create a div that we'll render the modal into. Because each
        // Modal component has its own element, we can render multiple
        // modal components into the modal container.
        this.el = document.createElement('div');
    }

    componentDidMount() {
        // Append the element into the DOM on mount. We'll render
        // into the modal container element (see the HTML tab).
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        // Remove the element from the DOM when we unmount
        modalRoot.removeChild(this.el);
    }

    clickOutsideModal(e) {
        if(e.target.classList.value === 'modal') {
            this.props.hide();
        }
    }

    render() {
        // Use a portal to render the children into the element
        let modal = (
            <div className="modal" onClick={(e) => this.clickOutsideModal(e)}>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
        return ReactDOM.createPortal(
            modal,  // Any valid React child: JSX, strings, arrays, etc.
            this.el  // A DOM element
        );
    }
}

