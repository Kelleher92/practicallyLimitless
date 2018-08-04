import React, { Component } from 'react';
// import {StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../components/CheckoutForm';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Header from '../components/Header';
// import CheckoutForm from './CheckoutForm';

class Donate extends Component {
    render() {
        return (
            <div >
            <Header />
                <StripeProvider apiKey="pk_test_OwBlwmstGHJD6CYOJB9w386a">
                    <Elements>
                        <CheckoutForm token={this.props.token}/>
                    </Elements>
                </StripeProvider>
            </div>
        );
    }
}

export default Donate;