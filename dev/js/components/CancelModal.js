import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CancelModal extends React.Component {
    render() {
        if(!this.props.show) {
            return null;
        }

        return (
            <div className="modal" >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        {this.props.children}
                        <div>
                        <button className="pl-button--style-2" onClick={this.props.onClose}>Cancel</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

CancelModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default CancelModal;