import React, { Component } from 'react';
import SandwichOrders from '../../components/SandwichOrders/SandwichOrders';
import axios from '../../axiosOrders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Orders.css';


class Orders extends Component {

  // mounts once when the component mounts.
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render () {
    // let orders = <Spinner />;
    // if(!this.state.loading) {
    //   orders = this.state.orders.map(order => {
    //     <SandwichOrders
    //       key={order.id}
    //       ingredients={order.ingredients}
    //       price={+order.price} />;
    //   });
    // }
    let orders = <Spinner />;
    if(!this.props.loading) {
      orders = this.props.orders.map(order => (
        <SandwichOrders
          key={order.id}
          ingredients={order.ingredients}
          price={order.price} />
      ));
    }
    return (
      <div>
        <h3 className={classes.Orders}><strong>Your Orders:</strong></h3>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(orderActions.fetchOrders(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
