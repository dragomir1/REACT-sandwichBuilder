import React from 'react';
import classes from './Sandwich.css';
// import PropTypes from 'prop-types';
import SandwichIngredient from './SandwichIngredient/SandwichIngredient';


// we use curly braces to add js logic before we render jsx.
// the jsx we are export will be the sandwich ingredient component.
// we add a div to this sandwich wrapper to give it some styleing for the sandwich
// there has to be a type since we're using PropTypes.
const sandwich = (props) => {
  // we need to get the ingredients object and pass it to the sandwich. we need to transform it into an array of the values of the ingredients in the sandwichbuilder.
  // OBJECT IS A DEFAULT JS OBJECT THAT HAS A KEYS METHOD. THIS EXTRACTS THE KEYS OF A GIVEN OBJECT AND TURNS THAT INTO AN ARRAY. SO IT GIVES YOU AN ARRAY OF THE KEYS.

  // we transfored an object of key/value pairs into an array of sandwich ingredients  where the value of the object helps decide how many ingredients is needed and the key to decide which type of ingredient.
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingKey => {
      return [...Array(props.ingredients[ingKey])].map((_, i) => {
        return <SandwichIngredient key={ingKey + i} type={ingKey} />;
      });
    })
    // we use reduce to pull out the values from the array and create a new array with those values. reduce takes two arguments. the previous value and the current value.  we are add the el to the current arr.
    //  we flatened the array.. with the reduce method.
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
    // if its emtpy we can check for it.
  if(transformedIngredients.length === 0) {
    transformedIngredients = <div> Customize your delicious Sandwich!</div>;
  }
  console.log(transformedIngredients);

  return (
    <div className={classes.Sandwich}>
      <SandwichIngredient type="bread-top" />
      {transformedIngredients}
      <SandwichIngredient type="bread-bottom" />
    </div>
  );
};

export default sandwich;
