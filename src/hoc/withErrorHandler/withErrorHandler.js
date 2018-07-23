import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

// we set up an axios instance by adding it as a second argument to the component.  we need to get the imfo from the wrapped component.  to get that info, we add a second argument so we can set up a glonal error handler. to use that instance, we need to change the funcitonal component into a class based component.
const errorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    state ={
      error: null
    }
    // axios interceptors are functions you can define globally which will be executed for every request leaving your app and every response returning into it. this is great for handling  global errors. we can access the request/response object on it and we add "use()" to register a new interceptor.
    // UNSAFE_componentWillMount is called before the child components are rendered. this allows us to register the interceptors and we want to do that before the child componets are rendered.
    UNSAFE_componentWillMount() {
      // the error on the request object is cleared. so that we start with a clean slate everytime we make a request.
      // when sending the request, we must return the request so that the request can continue.

      // WE ARE CREATING NEW PROPERTIES ON THIS CLASS THAT WILL ALOW US TO REMOVE THE OLD INCEPTORS THAT ARE NOT REQUIRED. this case, we want to remove interceptors when they are not needed anymore. in order for us to remove interceptors.  we need to store a referece to the interceptors we create in properties of this class.

      // we have created two new propertines in the class. and now we can use these proteries in unmount to remove these interceptors.
      this.requestInterceptor = axios.interceptors.request.use(request => {
        this.setState({error: null});
        return request;
      });
      //    response => response is the shorthand syntax of returning the response. we are implementing the response handler where we want to return the response as well.
      this.responseInterceptor = axios.interceptors.response.use(response => response, error => {
        this.setState({error: error});
      });
    }
    //this is a lfecyle hook that is exectued at the point in time then the component isn't required anymore.  In this case, we want to remove interceptors when they are not needed anymore. in order for us to remove interceptors.  we need to store a referece to the interceptors we create in properties of this class.
    // when we unmount this, this will prevent memory leaks.
    // this lifecycle hook ensures that whenever we don't the SandwichBuilder component anymore, we clean up the interceptors which we attached on the SandwichBuilder.  so that if we re-use with withErrorHandler in our app, we don't create more and more interceptors with the old ones living on.

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    };

    //this.state.error.message} this will always throw an error becuase the modal is always present even if we dont show it.  so we need to do a ternary expression.
    render () {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            cancelPurchaseHander={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message: null}
          </Modal>
          {/*distributing whatever props exits in the WrappedComponent.*/}
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default errorHandler;
