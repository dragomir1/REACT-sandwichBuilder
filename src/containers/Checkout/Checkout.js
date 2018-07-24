import React, { Component } from 'react';
import SandwichCheckoutSummary from '../../components/SandwichOrders/SandwichCheckoutSummary/SandwichCheckoutSummary';

// WE WANT TO USE THE ROUTER 'GLOBALLY'.  SO WE NEED TO WRAP OUR APP COMPONENT ON THE ROOT LEVEL.  INDEX.JS IS THE ROOT LEVEL.

import { Route, Redirect } from 'react-router-dom';
// the goal here is to show the summary of the burger with a continue or cancel button and then a contact form when they hit continue.
class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      ham: 0,
      tomato: 0,
      cheese: 0
    }
  };

  // we now need to parse the query params of the ingredients. we use componentDidMount

  componentDidMount() {
    //   // extracting the new ingredients data
    const query = new URLSearchParams(this.props.location.search);
    //   // created a new ingredients constant to store the extracted ingredients in an object form.


    const ingredients = {};
    //     // EACH ENRTY WILL HAVE THE FORMANT ['SALAD', '1']
    //     // the left side is the property name added to the ingredients object.
    //     // the right side is the value.  add a '+' to convert it to a number.
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    this.setState({ingredients:ingredients});
  }
  // since the checkout was loaded with the route component we have access to the special propterties on the URL object...the goback prop goes back to the last pagw
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }
  // the replace prop replaces the current route with another page. so when you hit continue the check out page is replace with the contact data page.
  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render () {
    return (
      <div>
        <SandwichCheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelledHandler={this.checkoutCancelledHandler}
          checkoutContinueHandler={this.checkoutContinueHandler} />
      </div>

    );
  }
}

export default Checkout;
