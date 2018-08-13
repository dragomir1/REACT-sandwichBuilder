import React from 'react';
import classes from './NavItem.css';
import { NavLink } from 'react-router-dom';

// {props.childred} allows us to wrap the txt we want to display with the component
const navitem = (props) => (
  <li className={classes.Navitem}>
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName={classes.active}>{props.children}
    </NavLink>
  </li>

);

export default navitem;
