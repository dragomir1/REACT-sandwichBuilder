import React from 'react';
import classes from './NavItem.css';

// {props.childred} allows us to wrap the txt we want to display with the component
const navitem = (props) => (
  <li className={classes.Navitem}>
    <a
      href={props.link}
      className={props.active ? classes.active : null}>{props.children}</a>
  </li>

);

export default navitem;
