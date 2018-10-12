import React, { Component } from 'react';
import Cards from './Cards';

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

    onTypeSearch(e) {
        var updatedList = this.state.active;
        var tempList = [];
        var value = e.target.value.toLowerCase();

        for(var i = 0; i < updatedList.length; i++) {
            if(updatedList[i].name.toLowerCase().includes(value) || updatedList[i].offerName.toLowerCase().includes(value) || updatedList[i].name.toLowerCase().includes(value)) {
                tempList.push(updatedList[ i]);
            }
        }
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
                <input type="text" placeholder="Search the task" className="form-input__value" onChange={(e) => this.onTypeSearch(e)} />

                        {this.state.active.map(i =>
                            <Cards  cardStatus={this.state.cardStatus} name={i.offerName} description={i.requirements} date={i.expiryDate} logo={i.logo}  />
                            )} 

                        {this.state.expired.map(i => 
                            <Cards  cardStatus={this.state.cardStatus} name={i.offerName} description={i.requirements} date={i.expiryDate} logo={i.logo}  />
                            
                        )}

                </div>
                <div className="form-input__section">
                    <button className="form__submit-button" onClick={this.props.onClickNew}>New Task</button>
                </div>
            </div>
        );
    }
}

export default DashboardTable;