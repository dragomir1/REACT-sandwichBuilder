// this component loads in checkout.
import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axiosOrders';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zipcode: ''
    },
    loading: false,
  }
  // we need the ingredients in contact data to be able to handle this request.  sow when users hit "order" we need to get the sandwich they ordered.
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      // the totalprice needs to be passed from SandwichBuilder.
      price: this.props.price,
      customer: {
        name: 'Darth Vader',
        address: {
          street: '1234 rolling hill',
          zipcode: '12345',
          country: 'USA'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'super fast'
    };
    axios.post('/orders.json', order)
      .then(response => {
        // purchasing: false closes the model when clicked.
        this.setState({loading: false});
        // this redirects to root page.  this works in conjunction with the <Route
        // path={this.props.match.path + '/contact-data'}
        // render={(props) => ( <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} /> )} /> in the checkout component.
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({loading: false});
      });

  }


  render () {
    let form = (
      <form>
        <input className={classes.Input} type='text' name='name' placeholder='name' />
        <input className={classes.Input} type='email' name='email' placeholder='email' />
        <input className={classes.Input} type='text' name='street' placeholder='street' />
        <input className={classes.Input} type='text' name='zipcode' placeholder='zipcode' />
        <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact info</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
