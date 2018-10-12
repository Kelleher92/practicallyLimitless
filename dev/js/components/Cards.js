import React, {Component} from 'react';

class Cards extends Component {
   render() {

    let status = this.props.cardStatus;
       return (
           <div>
               <div className="card__container">
                   <div><img src={this.props.logo} alt="logo" className="card__logo"/> </div>
                   <div className="card__header"> {this.props.name} </div>
                   <div className="card__offername"> {this.props.description} </div>
                   <div className="card__offername"> {this.props.date} </div>
                   <button className="pl-button--style-2" >Apply</button>
                </div>
           </div>
       );
   }
}

export default Cards;