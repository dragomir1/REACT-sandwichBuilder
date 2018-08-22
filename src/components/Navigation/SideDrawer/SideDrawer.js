import React from 'react';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Navitems from '../NavItems/NavItems';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/Aux/Aux';
// we return a funciton body becase we are adding some logic before returning jsx. basically adding animation when side drawer opens.

// this is passed to the Layout.js file.
// we import Aux to wrap adjacent jsx elements

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if(props.showSideDrawer) {
    attachedClasses= [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.showSideDrawer} clicked={props.showSideDrawerClosed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <Navitems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};


export default sideDrawer;
