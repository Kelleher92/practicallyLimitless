import React, {Component} from 'react';


class Cards extends Component {
   render() {

    let status = this.props.cardStatus;
       return (
           
           <div className=".Row xs={6} md={4}">
           <div className="form__cardcontainer">
                   <div><img src={this.props.logo} alt="logo" className="form-cardlogo"/> </div>
                   <div className="form-cardheader"> {this.props.name} </div>
                   <div className="form-cardoffername"> {this.props.description} </div>
                   <div className="form-cardoffername"> {this.props.date} </div>
                   <button className="pl-button--style-2" >Apply</button>
                   </div>
                   </div>
    

       );
   }
}

export default Cards;

       