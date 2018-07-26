import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

const handleBlur = () => {
    console.log('[blur]');
};
const handleChange = (change) => {
    console.log('[change]', change);
};
const handleClick = () => {
    console.log('[click]');
};
const handleFocus = () => {
    console.log('[focus]');
};
const handleReady = () => {
    console.log('[ready]');
};
const createOptions = (fontSize, padding) => {
    return {
      style: {
        base: {
          fontSize,
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

class StripeCardForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(ev) {
        ev.preventDefault();
        if (this.props.stripe) {
            this.props.stripe
                .createToken()
                .then((payload) => console.log('[token]', payload));
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
    };
    render() {
        return (
            <CardElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                {...createOptions(this.props.fontSize)}
            />
        );
    }
}
export default injectStripe(StripeCardForm);