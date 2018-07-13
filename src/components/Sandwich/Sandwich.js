import React from 'react';
import classes from './Sandwich.css';
// import PropTypes from 'prop-types';
import SandwichIngredient from './SandwichIngredient/SandwichIngredient';


// we use curly braces to add js logic before we render jsx.
// the jsx we are export will be the sandwich ingredient component.
// we add a div to this sandwich wrapper to give it some styleing for the sandwich
// there has to be a type since we're using PropTypes.
const sandwich = (props) => {
  return (
    <div className={classes.Sandwich}>
      <SandwichIngredient type="bread-top" />
      <SandwichIngredient type="cheese" />
      <SandwichIngredient type="ham" />
      <SandwichIngredient type="cheese" />
      <SandwichIngredient type="ham" />
      <SandwichIngredient type="salad" />
      <SandwichIngredient type="cheese" />
      <SandwichIngredient type="ham" />
      <SandwichIngredient type="cheese" />
      <SandwichIngredient type="ham" />
      <SandwichIngredient type="tomato" />
      <SandwichIngredient type="cheese" />
      <SandwichIngredient type="ham" />
      <SandwichIngredient type="cheese" />
      <SandwichIngredient type="ham" />
      <SandwichIngredient type="bread-bottom" />
    </div>
  );
};

export default sandwich;
