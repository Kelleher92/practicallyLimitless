// import React, { Component } from 'react';
// import {injectStripe, Elements} from 'react-stripe-elements';
// // import StripePaymentRequestForm from './StripePaymentRequestForm';
// import StripeCardForm from './StripeCardForm';

// class CheckoutForm extends Component {
    
//     constructor(props) {
//         super(props);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
    

//     handleSubmit(ev) {
//         ev.preventDefault();
//         if (this.props.stripe) {
//             this.props.stripe
//                 .createToken()
//                 .then((payload) => console.log('[token]', payload));
//         } else {
//             console.log("Stripe.js hasn't loaded yet.");
//         }
//     };



//     render() {
//         return (
//             <div className="stripe-checkout">
//                 <h1>Enter Card Details Below</h1>
//                 <form className="stripe-form" onSubmit={this.handleSubmit}>    
//                     <label className="stripe-label">Donation details</label>
//                     <Elements>
//                         <input className="stripe-amount" type='number' placeholder='Amount: e.g. 10.00' />
//                     </Elements>
//                     <Elements>
//                         {/* <StripePaymentRequestForm fontSize={'14px'} /> */}
//                         <StripeCardForm fontSize={'18px'}/>
//                     </Elements>
//                     <button className="stripe-button">Pay</button>
//                 </form>
//             </div>
//         );
//     }
// }

// export default injectStripe(CheckoutForm);


import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

const createOptions = (fontSize, padding) => {
    return {
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
          padding,
        },
        invalid: {
          color: '#9e2146',
        },
      },
    };
  };

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            total: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(name, e) {
        this.setState({[name]: e.target.value});
    }
    
    handleBlur = () => {
        console.log('[blur]');
    };
    handleChange = (change) => {
        console.log('[change]', change);
    };
    handleClick = () => {
        console.log('[click]');
    };
    handleFocus = () => {
        console.log('[focus]');
    };
    handleReady = () => {
        console.log('[ready]');
    };
    
    async handleSubmit(ev) {
        ev.preventDefault();
        console.log('User clicked submit');
        if (this.props.stripe) {
            this.props.stripe
                .createToken({ name: this.state.name })
                .then((payload) => console.log('[token]', payload));
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
    }

    render() {
        return (
            <div className="stripe-checkout">
                <form className="stripe-form" onSubmit={this.handleSubmit}> 
                    <p className="stripe-label">Would you like to donate to the cause?</p>
                    <input className="stripe-amount" type='text' placeholder='Name' onChange={(e) => this.handleInputChange("name", e)}/>
                    <input className="stripe-amount" type='number' placeholder='Amount eg. 10.00' onChange={(e) => this.handleInputChange("total", e)} />
                    <CardElement
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onReady={this.handleReady}
                        {...createOptions(this.props.fontSize)}
                    />
                    <button className="stripe-button">Submit</button>
                </form>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);