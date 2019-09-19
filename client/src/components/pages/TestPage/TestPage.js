import React, { Component } from 'react';
import './TestPage.css';

class TestPage extends Component {
  state = {
    "name": "Donald Duck",
    "address_line1": "123 Acme Ave.",
    "address_line2": "Unit 199",
    "address_city": "Tinseltown",
    "address_state": "CA",
    "address_zip": "54321",
    "cardBack_text": "Sample cardback message of hope and inspiration.",
    //
    "front_template_id": "tmpl_6b35f867e521b41"
  }

  
  onChange = (e) => {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  submit = () => {
    const formData = {
      toAddress: {
        name: this.state.name,
        address_line1: this.state.address_line1,
        address_line2: this.state.address_line2,
        address_city: this.state.address_city,
        address_state: this.state.address_state,
        address_zip: this.state.address_zip,
        address_country: "US"
      },
      cardBack_text: this.state.cardBack_text,
      frontTemplateId: this.state.front_template_id,
      status: "saved",
      stripeChargeId: null,
      lobApiId: null,
      createDate: new Date(),
      lastModifiedDate: null,
    };

    fetch('/api/mongodb/sendapostcard/postcards', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Got this back', data);

        // Redirect to home page
        this.props.history.push('/');
      });
  }


  render() {
    return (
      <div className="WriteArticle">
        <h1>Create a Postcard</h1>
        <input
            name="name"
            placeholder="Recipient Name"
            value={this.state.name}
            onChange={this.onChange}
          />
        <br />
        <input
            name="address_line1"
            placeholder="Address Line 1"
            value={this.state.address_line1}
            onChange={this.onChange}
          />
        <br />
        <input
            name="address_line2"
            placeholder="Address Line 2"
            value={this.state.address_line2}
            onChange={this.onChange}
          />
        <br />
        <input
            name="address_city"
            placeholder="City"
            value={this.state.address_city}
            onChange={this.onChange}
          />
        <br />
        <input
            name="address_state"
            placeholder="State"
            value={this.state.address_state}
            onChange={this.onChange}
          />
        <br />
        <input
            name="address_zip"
            placeholder="Zip code"
            value={this.state.address_zip}
            onChange={this.onChange}
          />
        <br />

        <textarea
            name="cardBack_text"
            placeholder="Text"
            value={this.state.cardBack_text}
            onChange={this.onChange}
          />

        <br />

        <button onClick={this.submit}>Send Postcard</button>
      </div>

    );
  }
}

export default TestPage;
