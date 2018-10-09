import React, { Component } from 'react';

class UserDashboardTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initial: this.props.active,
            active: this.props.active,
            sortKey: null
        };

        this.onSort = this.onSort.bind(this);
        this.onTypeSearch = this.onTypeSearch.bind(this);
    }

    handleChange(name, e) {
        this.setState({[name]: e.target.value});
    }

    onTypeSearch(e) {
        var updatedList = this.state.initial;
        var tempList = [];
        var value = e.target.value.toLowerCase();

        for(var i = 0; i < updatedList.length; i++) {
            if(updatedList[i].name.toLowerCase().includes(value) || updatedList[i].offerName.toLowerCase().includes(value) || updatedList[i].name.toLowerCase().includes(value)) {
                tempList.push(updatedList[ i]);
            }
        }

        this.setState({active: tempList});
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
                        <div className="form-input__section">
                            <input type="text" placeholder="Search the task" className="form-input__value" onChange={(e) => this.onTypeSearch(e)} />
                        </div>
                    </div>
            
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col" className="dashboard__table-header" onClick={e => this.onSort(e, 'name')}>Name</th>
                                <th scope="col" className="dashboard__table-header" onClick={e => this.onSort(e, 'address')}> Address </th>
                                <th scope="col" className="dashboard__table-header" onClick={e => this.onSort(e, 'email')}>E-mail</th>
                                <th scope="col" className="dashboard__table-header" onClick={e => this.onSort(e, 'number')}> Contact number</th>
                                <th scope="col" className="dashboard__table-header" onClick={e => this.onSort(e, 'companyId')}>Company ID</th>
                                <th scope="col" className="dashboard__table-header" onClick={e => this.onSort(e, 'offerName')}>offer Name</th>
                                <th scope="col" className="dashboard__table-header" onClick={e => this.onSort(e, 'requirements')}>Requirements</th>
                                <th scope="col" className="dashboard__table-header" onClick={e => this.onSort(e, 'expiryDate')}>Expiry Date</th>  
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.active.map(i => 
                                <tr key={i.id}>
                                    <td>{i.name}</td>
                                    <td>{i.address}</td>
                                    <td>{i.email}</td>
                                    <td>{i.number}</td>
                                    <td>{i.companyId}</td>
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
