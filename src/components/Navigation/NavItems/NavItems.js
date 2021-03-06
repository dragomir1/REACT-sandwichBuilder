import React from 'react';
import classes from './NavItems.css';
import Navitem from './NavItem/NavItem';

// since we have {props.children} in navlink we are wrapping the text with the navitem component. active is a bolean prop.
const navitems = (props) => (
  <ul className={classes.Navitems}>
    <Navitem link='/' exact>Sandwich Builder</Navitem>
    {props.isAuthenticated ? <Navitem link='/orders'>Orders</Navitem> : null}
    {!props.isAuthenticated
      ? <Navitem link='/auth'>Authenticate</Navitem>
      : <Navitem link='/logout'>Logout</Navitem>
    }
  </ul>
);

export default navitems;

// <Navitem link='/'>Checkout</Navitem>
