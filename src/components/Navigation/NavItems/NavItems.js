import React from 'react';
import classes from './NavItems.css';
import Navitem from './NavItem/NavItem';

// since we have {props.children} in navlink we are wrapping the text with the navitem component. active is a bolean prop.
const navitems = (props) => (
  <ul className={classes.Navitems}>
    <Navitem link='/' active>Sandwich Builder</Navitem>
    <Navitem link='/'>Checkout</Navitem>
  </ul>
);

export default navitems;
