import React, { Component } from 'react';
// you need to install it in terminal
import PropTypes from 'prop-types';
import classes from './SandwichIngredient.css';

// inside a class you access props with 'this' keyword.
// initialization is null even if something invalid is passed.
class SandwichIngredient extends Component {
  render () {

    let ingredient = null;

    switch(this.props.type) {
    case('bread-top'):
      ingredient = <div className={classes.BreadTop}></div>;
      break;
    case('bread-bottom'):
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    case('cheese'):
      ingredient = <div className={classes.Cheese}></div>;
      break;
    case('tomato'):
      ingredient = <div className={classes.Tomato}></div>;
      break;
    case('ham'):
      ingredient = <div className={classes.Ham}></div>;
      break;
    case('salad'):
      ingredient = <div className={classes.Salad}></div>;
      break;
    default:
      ingredient = null;
    }
    return ingredient;
  }
}
// we are adding proptypes validation.  we return an object.  proptypes is a property.  the point of this is that we will get an error if we try to use the ingredient without passing a type.
SandwichIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default SandwichIngredient;
