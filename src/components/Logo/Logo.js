import React from 'react';
import classes from './Logo.css';
import imageLogo from '../../assets/images/burgerlogocopy.png';


const logo = (props) => (
  <div className={classes.Logo}>
    <img src={imageLogo} alt='logo' />
  </div>
);

export default logo;
