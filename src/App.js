import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import SandwichBuilder from './containers/SandwichBuilder/SandwichBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
// Route sets up routing.
// Switch allows us to catch only one hit..but we need to switch order.
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          {/*<Route path="/" component={SandwichBuilder}/> will always load becuase of the prefix standard. so anytime there's a '/' before the endpoint, that '/' component will always load.*/}
          {/*when using 'Switch', the order matters.  so put the '/' on the bottom if you dont want to catch when routing to the checkout.*/}
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            {/*only direct components loading through routes get the special 'history', 'match' props.  if it's a component in a direct component. they do not get these special props.  you need the {withRouter} hoc to add these props.*/}
            <Route path="/" component={SandwichBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
