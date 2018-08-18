import React, { Component } from 'react';
import SandwichOrders from '../../components/SandwichOrders/SandwichOrders';
import axios from '../../axiosOrders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component {

  // mounts once when the component mounts.
  componentDidMount() {
    this.props.onFetchOrders();
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
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(orderActions.fetchOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
