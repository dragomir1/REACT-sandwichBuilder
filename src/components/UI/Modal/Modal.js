import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';


// for the modal, we need Backdrop.
//  the modal should be a div that wraps itself around any content.  in this case {props.children}.  {props.children} can really be anything piece of data.  we can pass anything in there.
// the styleing is making the modal animate when you click the order button.
const modal = (props) => (
  <Aux>
    <Backdrop show={props.show} clicked={props.cancelPurchaseHander}/>
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}>
      {props.children}
    </div>
  </Aux>

);

export default modal;
