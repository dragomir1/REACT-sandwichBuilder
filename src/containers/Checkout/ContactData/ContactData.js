// this component loads in checkout.
import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axiosOrders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Zipcode'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'fastest'},
            {value: 'cheapest', displayValue: 'cheapest'},
            {value: 'snailSpeed', displayValue: 'snailSpeed'},
            {value: 'rabbitSpeed', displayValue: 'rabbitSpeed'}
          ]
        },
        value: '',
        validation: {},
        valid: true,
        touched: false
      }
    },
    loading: false,
    FormIsValid: false
  }
  // we need the ingredients in contact data to be able to handle this request.  sow when users hit "order" we need to get the sandwich they ordered.
  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      // the totalprice needs to be passed from SandwichBuilder.
      price: this.props.price,
      orderData: formData
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

  checkValidation(value, rules) {
    let isValid = true;

    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }


    return isValid;
  }

  inputChangedHandler = (event, inputValue) => {
    console.log(event.target.value);
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    // deep clone
    const updatedFormElement = {
      ...updatedOrderForm[inputValue]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputValue] = updatedFormElement;
    updatedFormElement.touched = true;
    console.log(updatedFormElement);
    this.setState({orderForm: updatedOrderForm});

    let formIsValid = true;

    for(let formIds in updatedOrderForm) {
      formIsValid = updatedOrderForm[formIds].valid && formIsValid;
    }
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }


  render () {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))}
        <Button btnType='Success' disabled={!this.state.formIsValid}>Order</Button>
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
