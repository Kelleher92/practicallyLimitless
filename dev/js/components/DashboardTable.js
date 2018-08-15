import React, { Component } from 'react';

class DashboardTable extends Component {
    render() {
        return (
            <div className="form-body">
                <div className="form-input__section">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Expiry Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.active.map(i => 
                            <tr key={i.id}>
                                <td>{i.offerName}</td>
                                <td>{i.expiryDate}</td>
                            </tr>
                        )}
                        {this.props.expired.map(i => 
                            <tr key={i.id}>
                                <td className="table-danger">{i.offerName}</td>
                                <td className="table-danger">{i.expiryDate}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="form-input__section">
                    <button className="form__submit-button" onClick={this.props.onClickNew}>New Offer</button>
                </div>
            </div>
        );
    }
}

export default DashboardTable;