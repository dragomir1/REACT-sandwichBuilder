import React, { Component } from 'react';
import SandwichOrders from '../../components/SandwichOrders/SandwichOrders';
import axios from '../../axiosOrders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  // mounts once when the component mounts.
  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        console.log(res.data);
        const fetchedOrders = [];
        for(let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({loading: false, orders: fetchedOrders});
      })
      .catch(err => {
        this.setState({loading: false});
      });
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
    return (
      <div>
        {this.state.orders.map(order => (
          <SandwichOrders
            key={order.id}
            ingredients={order.ingredients}
            price={order.price} />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
