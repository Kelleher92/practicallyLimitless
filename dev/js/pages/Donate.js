import React, { Component } from 'react';
// import {StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../components/CheckoutForm';
import {Elements, StripeProvider} from 'react-stripe-elements';
// import CheckoutForm from './CheckoutForm';

class Donate extends Component {
    render() {
        return (
            // <StripeProvider apiKey="pk_test_OwBlwmstGHJD6CYOJB9w386a">
            //     <CheckoutForm />
            // </StripeProvider>
            <StripeProvider apiKey="pk_test_OwBlwmstGHJD6CYOJB9w386a">
                <Elements>
                    <CheckoutForm />
                </Elements>
            </StripeProvider>
        );
    }
}

export default Donate;