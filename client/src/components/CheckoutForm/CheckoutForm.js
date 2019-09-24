import React, { Component } from 'react';
import './CheckoutForm.css';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Redirect } from 'react-router-dom'

// import StripeCheckout from '../StripeCheckout/StripeCheckout.js';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complete: false,
            error: false,
            lobApiId: null,
        };
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {
        ev.preventDefault();
        let { token } = await this.props.stripe.createToken({ name: "Name" });
        console.log(token.id, this.props.card_id)
        //Adding props for card id to allow passing card_id
        let response = await fetch(("/charge/" + this.props.card_id), {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: token.id
        });

        if (response.ok) {
            console.log("Purchase Complete!");
            this.setState({ complete: true });

            console.log('Fetching lob api id');

            //hardcoding a delay 
            //this should be updated to be more precise 
            //i.e. only happen when the server.js send_postcard finishes successfully
            setTimeout(
                function () {
                    fetch('/getLobApiId/' + this.props.card_id)
                        .then(response => response.json())
                        .then(data => {
                            console.log('Got data back', data);
                            this.setState({
                                lobApiId: data.lobApiId,
                            })
                        })

                }.bind(this),
                5000
            );

        } else {
            this.setState({ error: true })
            console.log("Charge failed.")
        }
    }

    render() {
        if (this.state.lobApiId) return <Redirect to={'/thank-you/' + this.state.lobApiId} />;
        if (this.state.error)
            return <div><h4>Something went wrong.</h4><p>You were not charged.</p><p>Please refresh the page and try again.</p></div>;
        return (
            <div className="CheckoutForm">
                <h4>Payment Info</h4>
                <div className="CheckoutForm-stripe">
                    <CardElement style={{base: {fontSize: '18px'}}}/>
                </div>
                {/* <h4>Order Details</h4> */}
                <div className="CheckoutForm-total">
                    <p>Order total</p>
                    <p>$2.00</p>
                </div>
                {/* <button onClick={this.props.submit}>Send</button> */}
                <div className="CheckoutForm-submitButtonArea">
                    <button onClick={this.submit}>
                        Submit Payment
                </button>
                </div>
            </div>
        )
    }
}

export default injectStripe(CheckoutForm);