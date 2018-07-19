import React from 'react';
import classes from './Button.css';

// in the className we need to pass a string at the end beuase we are conditionally passing either a Success color or a Fail color - green or red. so we need to make the classname into an array then use join to convert them into a string. btnType is set from outside. we pass the btn prop from the orderSummary.
const button = (props) => (
  <button
    className={[classes.Button, classes[props.btnType]].join(' ')}
    disabled={props.disabled}
    onClick={props.clicked}>{props.children}
  </button>
);

export default button;
