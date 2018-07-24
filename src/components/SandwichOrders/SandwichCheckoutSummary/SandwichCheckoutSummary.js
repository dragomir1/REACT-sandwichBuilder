import React from 'react';
import classes from './SandwichCheckoutSummary.css';
import Sandwich from '../../Sandwich/Sandwich';
import Button from '../../UI/Button/Button';

const SandwichOrderSummary = (props) => {
  return (
    <div className={classes.SandwichOrderSummary}>
      <h2>Your Sandwich Order:</h2>
      <div style={{width: '100%', margin: 'auto'}}>
        <Sandwich ingredients={props.ingredients} />
      </div>
      <Button
        btnType='Danger'
        clicked={props.checkoutCancelledHandler}>Cancel Order</Button>
      <Button
        btnType='Success'
        clicked={props.checkoutContinueHandler}>Submit Order</Button>
    </div>
  );
};

export default SandwichOrderSummary;
