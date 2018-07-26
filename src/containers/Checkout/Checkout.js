import React, { Component } from 'react';
import SandwichCheckoutSummary from '../../components/SandwichOrders/SandwichCheckoutSummary/SandwichCheckoutSummary';
import ContactData from './ContactData/ContactData';

// WE WANT TO USE THE ROUTER 'GLOBALLY'.  SO WE NEED TO WRAP OUR APP COMPONENT ON THE ROOT LEVEL.  INDEX.JS IS THE ROOT LEVEL.

import { Route, Redirect } from 'react-router-dom';
// the goal here is to show the summary of the burger with a continue or cancel button and then a contact form when they hit continue.
class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  }

  // we now need to parse the query params of the ingredients.

  // FYI FYI FYI FYI FYI FYI FYI FYI FYI FYI => we convert componentDidMount to componentWillMount...
  // componentWillMount sets up the state prior to rendereing the childrend.


  // TypeError: Cannot convert undefined or null to object
  // sandwich
  // src/components/Sandwich/Sandwich.js:20
  // > 20 | let transformedIngredients = Object.keys(props.ingredients)
  //   21 |   .map(ingKey => {
  //   22 |     return [...Array(props.ingredients[ingKey])].map((_, i) => {
  //   23 |       return <SandwichIngredient key={ingKey + i} type={ingKey} />;


  UNSAFE_componentWillMount() {
    //   // extracting the new ingredients data
    const query = new URLSearchParams(this.props.location.search);
    //   // created a new ingredients constant to store the extracted ingredients in an object form.


    const ingredients = {};
    let price= 0;
    //     // EACH ENRTY WILL HAVE THE FORMANT ['SALAD', '1']
    //     // the left side is the property name added to the ingredients object.
    //     // the right side is the value.  add a '+' to convert it to a number.
    // this is now a way of getting the price in the checkout component
    for (let param of query.entries()) {
      if(param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ingredients:ingredients, totalPrice: price});
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
    {/*// this.props.match.path => this adds to the current path we are currently on.*/}


    {/*<Route
      path={this.props.match.path + '/contact-data'}
      component={ContactData} />*/}

    {/*we want to pass the ingredients we have in this component to contact data. we need to do this:  now that we're rendering manually, we can pass props to it.  see below*/}

    // once we hit the button in the contact data, we need to redirect. howerver, due to the way we're loading contact data by rendiering it manually, with the render method, we don't have the history method available. we can have access to the history method by passing props to render method and then distributing it to the ContactData component. see below.
    return (
      <div>
        <SandwichCheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelledHandler={this.checkoutCancelledHandler}
          checkoutContinueHandler={this.checkoutContinueHandler} />
        <Route
          path={this.props.match.path + '/contact-data'}
          render={(props) => ( <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} /> )} />

      </div>

    );
  }
}

export default Checkout;
