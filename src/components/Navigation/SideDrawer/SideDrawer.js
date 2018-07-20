import React from 'react';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Navitems from '../NavItems/NavItems';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/Aux';
// we return a funciton body becase we are adding some logic before returning jsx. basically adding animation when side drawer opens.

// this is passed to the Layout.js file.
// we import Aux to wrap adjacent jsx elements

const sideDrawer = (props) => {
  return (
    <Aux>
      <Backdrop show />
      <div className={classes.SideDrawer}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <Navitems />
        </nav>
      </div>
    </Aux>
  );
};


export default sideDrawer;
