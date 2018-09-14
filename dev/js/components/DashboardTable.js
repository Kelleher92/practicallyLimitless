import React, { Component } from 'react';

class DashboardTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.active,
            expired: this.props.expired,
            sortKey: null
        };
        this.onSort = this.onSort.bind(this)
    }

    onSort(event, sortKey) {
        const active = this.state.active;
        const expired = this.state.expired;

        if(this.state.sortKey === sortKey) {
            active.reverse();
            expired.reverse();
        } else {
            active.sort((a,b) => a[sortKey].localeCompare(b[sortKey]));
            expired.sort((a,b) => a[sortKey].localeCompare(b[sortKey]));
        }

        this.setState({active, expired, sortKey});
    }

    render() {
        return (
            <div className="form-body">
                <div className="form-input__section">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col" className="dashboard__table-header" onClick={e => this.onSort(e, 'offerName')}>Name</th>
                                <th scope="col" className="dashboard__table-header" onClick={e => this.onSort(e, 'requirements')}>Requirements</th>
                                <th scope="col" className="dashboard__table-header" onClick={e => this.onSort(e, 'expiryDate')}>Expiry Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.active.map(i => 
                            <tr key={i.id}>
                                <td>{i.offerName}</td>
                                <td>{i.requirements}</td>
                                <td>{i.expiryDate}</td>
                            </tr>
                        )}
                        {this.state.expired.map(i => 
                            <tr key={i.id}>
                                <td className="table-danger">{i.offerName}</td>
                                <td className="table-danger">{i.requirements}</td>
                                <td className="table-danger">{i.expiryDate}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="form-input__section">
                    <button className="form__submit-button" onClick={this.props.onClickNew}>New Task</button>
                </div>
            </div>
        );
    }
}

export default DashboardTable;