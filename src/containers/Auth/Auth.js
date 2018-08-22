import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as authActions from '../../store/actions/index';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axiosOrders';
class Auth extends Component {

  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: true
  }

  // UNSAFE_componentWillMount () {
  //
  // }

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

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidation(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };
    this.setState({controls: updatedControls});
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);

  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      };
    });
  }

  render() {
    const formElementArray = [];
    for( let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = formElementArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        value={formElement.config.value}
        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
    ));

    if(this.props.loading) {
      form = <Spinner />;
    }
    let errorMessage = null;
    if(this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }

    return (
      <div className={classes.Auth}>
        {errorMessage}
        <form
          onSubmit={this.submitHandler}>
          {form}
          <Button btnType='Success'>SUBMIT</Button>
        </form>
        <Button
          clicked={this.switchAuthModeHandler}
          btnType="Danger">Switch to {this.state.isSignUp ? "SIGNIN" : "SIGNUP" }
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = dispath => {
  return {
    onAuth: (email, password, isSignUp) => dispath(authActions.auth(email, password, isSignUp)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));
