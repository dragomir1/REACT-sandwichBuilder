import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import SandwichBuilder from './containers/SandwichBuilder/SandwichBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import LazyLoading from './hoc/LazyLoading/LazyLoading';


// Route sets up routing.
// Switch allows us to catch only one hit..but we need to switch order.
// we need to import withRouter in order for connect to work. otherwise it will break the router.  we then need to wrap it at the bottom when we export.
// withRouter will enforce your props being passed down to the app component. you use this funcion when you use connect.
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
// import Auth from './containers/Auth/Auth';

// LazyLoading. the argument we pass needs to be a function.
const asyncCheckout = LazyLoading(() => {
  return import ('./containers/Checkout/Checkout');
});
const asyncOrders = LazyLoading(() => {
  return import ('./containers/Orders/Orders');
});
const asyncAuth = LazyLoading(() => {
  return import ('./containers/Auth/Auth');
});

class App extends Component {

  componentDidMount() {
    this.props.onAutoSignup();
  }

  render() {
    // unauthenticated users...
    let routes = (
      <Switch>
        <Route path="/" exact component={SandwichBuilder} />
        <Route path="/auth" component={asyncAuth} />
        <Redirect to="/" />
      </Switch>
    );
    {/*<Route path="/" component={SandwichBuilder}/> will always load becuase of the prefix standard. so anytime there's a '/' before the endpoint, that '/' component will always load.*/}
    {/*when using 'Switch', the order matters.  so put the '/' on the bottom if you dont want to catch when routing to the checkout.*/}

    {/*only direct components loading through routes get the special 'history', 'match' props.  if it's a component in a direct component. they do not get these special props.  you need the {withRouter} hoc to add these props.*/}
    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={SandwichBuilder} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
