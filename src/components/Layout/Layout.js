import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
// this has been coverted to a class so we can manage the toggle state of the sideDrawer button.


class Layout extends Component {
  state={
    showSideDrawer: true
  }

  showSideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  render () {
    return (
      <Aux>
        <Toolbar />
        <SideDrawer showSideDrawerClosed={this.showSideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}
export default Layout;
