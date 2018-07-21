import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';


// for the modal, we need Backdrop.
//  the modal should be a div that wraps itself around any content.  in this case {props.children}.  {props.children} can really be anything piece of data.  we can pass anything in there.
// the styleing is making the modal animate when you click the order button.

// we converted to modal to a class to check if the component updates and rerenders.

class Modal extends Component {
// this lifecycle hook controls the updateing of OrderSummary by changing the way the modal updates.
  shouldComponemtUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  UNSAFE_componentWillUpdate() {
    console.log('modal will update');
  }

  render () {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.cancelPurchaseHander}/>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}


export default Modal;
