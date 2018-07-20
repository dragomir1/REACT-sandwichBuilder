import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Navitems from '../NavItems/NavItems';


const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <Navitems />
    </nav>
  </header>
);

export default toolbar;
