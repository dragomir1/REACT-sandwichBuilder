import React from 'react';
import classes from './SandwichControl.css';


const sandwichcontrol = (props) => (
  <div className={classes.SandwichControl}>
    <div className={classes.IngredientLabel}>{props.ingredientLabel}</div>
    <button
      className={classes.Less}
      onClick={props.removed}
      disabled={props.disabledRemoveButton}>Remove Ingredient</button>
    <button
      className={classes.More}
      onClick={props.added}>Add Ingredient</button>

  </div>

);


export default sandwichcontrol;
