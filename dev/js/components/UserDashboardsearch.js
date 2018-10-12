import React, { Component } from 'react';
import Cards from './Cards';

class UserDashboardsearch extends Component {
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
                    <div class="d-flex justify-content-center">
                        {this.state.active.map(i =>
                            <Cards  cardStatus={this.state.cardStatus} name={i.offerName} description={i.requirements} date={i.expiryDate} logo={i.logo}  />
                        )}        
                    </div>
                </div>
            </div>
        );
    }
}

export default UserDashboardsearch;