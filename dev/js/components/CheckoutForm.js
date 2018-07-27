import React, {Component} from 'react';
import {CardElement, injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement} from 'react-stripe-elements';
import $ from 'jquery';

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
            amount: 0,
            paymentComplete: false,
            paymentFail: false
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
        let me = this;
        console.log('User clicked submit');
        if (this.props.stripe) {
            this.props.stripe
                .createToken({ name: this.state.name, amount: this.state.amount })
                .then((stripeToken) => {
                    console.log('[token]', stripeToken);

                    $.ajax({
                        method: 'POST',
                        data: {
                            token: this.props.token,
                            action: 'processPayment',
                            data: JSON.stringify({token: stripeToken})
                        },
                        url: 'public/process.php',
                        success: function(res) {
                            setTimeout(function() { 
                                res = JSON.parse(res);
                                console.log(res.responseCode);
            
                                if(res.responseCode === 200) {
                                    me.setState({
                                        paymentComplete: true
                                    });
                                } else {
                                    // me.setState({
                                    //     isVerificationCheckComplete: true,
                                    //     wasRegistrationSuccessful: false
                                    // });
                                }
                            }, 1000);
                        },
                        error: function(res) {
                            setTimeout(function() { 
                                console.log('error ',res);
                                // me.setState({
                                //     isVerificationCheckComplete: true,
                                //     wasRegistrationSuccessful: false
                                // });
                            }, 1000);
                        }
                    });
                    
            });
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
    }

    render() {
        if (this.state.paymentComplete) return <h1>Purchase Complete</h1>;
        if (this.state.paymentFail) return <h1>Payment Failed.</h1>;

        return (
            <div className="stripe-checkout">
                <form className="stripe-form" onSubmit={this.handleSubmit}> 
                    <p className="stripe-label">Would you like to donate to the cause?</p>
                    <input className="stripe-amount" type='text' placeholder='Name' onChange={(e) => this.handleInputChange("name", e)}/>
                    <span className="stripe-amount-euro"><input type='number' placeholder='Amount eg. 10.00' onChange={(e) => this.handleInputChange("amount", e)} /></span>
                    <CardElement
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onReady={this.handleReady}
                        {...createOptions(this.props.fontSize)}
                    />
                    {/* <CardNumberElement /> */}
                    <button className="stripe-button">Submit</button>
                </form>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);