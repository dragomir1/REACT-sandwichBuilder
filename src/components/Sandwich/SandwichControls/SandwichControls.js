import React from 'react';
import classes from './SandwichControls.css';
import BuildControl from './SandwichControl/SandwichControl';


const controls = [
  {label: 'Salad:', type: "salad" },
  {label: 'Ham:', type: "ham" },
  {label: 'Tomato:', type: "tomato" },
  {label: 'Cheese:', type: "cheese" },
];


const sandwichControls = (props) => (
  <div className={classes.SandwichControls}>
    <h2> Your Burger Price: <strong>${props.price.toFixed(2)}</strong></h2>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        ingredientLabel={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabledRemoveButton={props.disabledRemoveButton[ctrl.type]} />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.orderButton}
      onClick={props.ordered}>{props.isAuth ? "ORDER" : "SIGN UP TO ORDER"}</button>
  </div>





);

export default sandwichControls;
