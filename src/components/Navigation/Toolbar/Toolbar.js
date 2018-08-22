import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Navitems from '../NavItems/NavItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';


const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.sideDrawerToggle}/>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <Navitems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;
