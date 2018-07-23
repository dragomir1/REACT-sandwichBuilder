import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
// regular funtion body to execute some code.
// object.keys transforms the object into an array of keys...salad, ham, etc..
// we want to map this into an array of jsx elements at the end.
// we use span to set some styling to the jsx code..capitalize the first letter of the ingredient.  we set the style to a JS object.out markings is for dynamic entry and inner pair is just a js object.

// we are adding a life cycyle hook to check when the orderSummary is updated.  we need to convert this to a class so we can add lifecycle hooks.

class OrderSummary extends Component {
// this lifecycle hook checks to see when componemts updated or re-rendered "UNSAFE is new in latest version of react.  use UNSAFE_componentWillUpdate instead of componemtWillUPdate" this is not required.
  // UNSAFE_componentWillUpdate() {
  //   console.log('Order Summary will update');
  // }

  render () {
    const ingredientSummary = Object.keys(this.props.ingredients).map(ingredientKey => {
      return (
        <li key={ingredientKey}>
          <span style={{textTransform: 'capitalize'}}>
            {ingredientKey} items
          </span>:
          {this.props.ingredients[ingredientKey]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order </h3>
        <p>Your Sandwich Order:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button
          btnType="Danger"
          clicked={this.props.cancelOrderHandler}>CANCEL</Button>
        <Button
          btnType="Success"
          clicked={this.props.continueOrderHandler}>ORDER</Button>
      </Aux>
    );
  }
}

export default OrderSummary;
