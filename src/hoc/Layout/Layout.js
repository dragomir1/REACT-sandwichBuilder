import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
// this has been coverted to a class so we can manage the toggle state of the sideDrawer button.


class Layout extends Component {
  state={
    showSideDrawer: false
  }
  // by using the arrow head syntax, the 'this' keyword inside this method will refer to the class at all times.
  showSideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  //if you use the state in setState you need to use the function form. if you dont, and due to the asynch nature of Js, you might get unexpected results.
sideDrawerToggleHandler = () => {
  this.setState((prevState) => {
    return {showSideDrawer: !prevState.showSideDrawer};
  });
}

render () {
  return (
    <Aux>
      <Toolbar sideDrawerToggle={this.sideDrawerToggleHandler} />
      <SideDrawer
        showSideDrawer={this.state.showSideDrawer}
        showSideDrawerClosed={this.showSideDrawerClosedHandler} />
      <main className={classes.Content}>
        {this.props.children}
      </main>
    </Aux>
  );
}
}
export default Layout;
