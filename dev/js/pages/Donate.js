import React, { Component } from 'react';
// import {StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../components/CheckoutForm';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import CheckoutForm from './CheckoutForm';

class Donate extends Component {
    render() {
        return (
            <div className="contain">
                <Header isLoggedIn={this.props.isLoggedIn} setLoggedOut={this.props.setLoggedOut} includeShadow={true}/>
                <div className="content-contain align-items-center">
                    <StripeProvider apiKey="pk_test_OwBlwmstGHJD6CYOJB9w386a">
                        <Elements>
                            <CheckoutForm token={this.props.token}/>
                        </Elements>
                    </StripeProvider>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Donate;