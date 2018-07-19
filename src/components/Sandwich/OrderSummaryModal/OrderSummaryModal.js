import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
// regular funtion body to execute some code.
// object.keys transforms the object into an array of keys...salad, ham, etc..
// we want to map this into an array of jsx elements at the end.
// we use span to set some styling to the jsx code..capitalize the first letter of the ingredient.  we set the style to a JS object.out markings is for dynamic entry and inner pair is just a js object.
const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(ingredientKey => {
    return (
      <li key={ingredientKey}>
        <span style={{textTransform: 'capitalize'}}>
          {ingredientKey} items
        </span>:
        {props.ingredients[ingredientKey]}
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
      <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button
        btnType="Danger"
        clicked={props.cancelOrderHandler}>CANCEL</Button>
      <Button
        btnType="Success"
        clicked={props.continueOrderHandler}>ORDER</Button>

    </Aux>
  );

};

export default orderSummary;
