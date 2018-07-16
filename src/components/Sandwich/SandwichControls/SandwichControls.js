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
    <h2> Your Burger Price:<strong></strong></h2>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        ingredientLabel={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabledRemoveButton={props.disabledRemoveButton[ctrl.type]}
      />
    ))}




  </div>





);

export default sandwichControls;
