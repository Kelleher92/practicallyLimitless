import React, { Component } from 'react';

class UserDashboardTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.active,
            sortKey: null
        };
        this.onSort = this.onSort.bind(this)
    }

    onSort(event, sortKey) {
        const active = this.state.active;

        if(this.state.sortKey === sortKey) {
            active.reverse();
        } else {
            active.sort((a,b) => a[sortKey].localeCompare(b[sortKey]));
        }

        this.setState({active, sortKey});
    }

    render() {
        return (
            <div className="form-body">
                <div className="form-input__section">
                 <div className="form-input__section labelled">
                        <div className="form-input__label">Search</div>
                        <input type="text" placeholder="Enter Search Value" className="form-input__value" value='' />
                        <button className="pl-button--style-2 search">Search</button>  
                    </div>
            
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
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default UserDashboardTable;
