import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Sandwich from '../../components/Sandwich/Sandwich';
import SandwichControls from '../../components/Sandwich/SandwichControls/SandwichControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummaryModal from '../../components/Sandwich/OrderSummaryModal/OrderSummaryModal';
import axios from '../../axiosOrders';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import * as actionTypes from '../../store/actions/actionTypes';
import * as sandwichBuilderActions from '../../store/actions/index';


class SandwichBuilder extends Component {

  state = {

    // this will tell us if the order now button was clicked.
    purchasing: false,
  }
  // this is a good way to fetch data.  Invoked once, only on the client (not on the server), immediately after the initial rendering occurs. At this point in the lifecycle, you can access any refs to your children (e.g., to access the underlying DOM representation).
  // So, imagine a situation where you want to get a list of Comments for an Article. After the component is created you may want to go retrieve the list of comments from the server and then display them to the user.

  // this is a request sent to the server to get data. the response should contain the ingredients object.
  componentDidMount() {
    // console.log(this.props);
    this.props.onInitialIngredients();
  }

  orderHandlerButton (ingredients) {
    // we need to sum up all the values in the ingredients object.  we need turn the object into an array of the values.
    // this will create an array of string entries.
    // we map the array we created into the array we need.  we ONLY WANT THE VALUES. NOT THE NAMES.
    const sum = Object.keys(ingredients).map(ingredientKey => {
      // this retuns and array of values.
      return ingredients[ingredientKey];
      // this retuns the sum of all ingredients. 0 is the starting number. then the function is exectued on each element in the mapped array.  in the function we get the new sum and the individual element.  Sum is the constantly updated current sum.  EL is a number becuase its the vale we access from returning ingredients[ingredientKey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
    // return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  cancelPurchaseHander = () => {
    this.setState({purchasing: false});
  }

  cancelOrderHandler = () => {
    this.setState({purchasing: false});
  };
  // for firebase it's any node name of your choice plus .json.  JSON is the endpoint that needs to be targeted.
  continueOrderHandler = () => {
    // WHEN WE CLICK CONTINUE, WE HAVE ACCESS TO THESE SPECIAL "MATCH", "LOCATION", "HISTORY" PROPS.
    // THE PUSH PROP ALLOWS US TO SWITCH THE PAGE AND PUSH A NEW PAGE ONTO THE STACK OF PAGES.
    // BUILDING THE LOGIC TO PASS THE INGREDIENTS WE PICKED ON TO THE CHECKOUT CONTAINER USEING QUERY PARAMS.
    // we need to push a JS object.
    // we specify a seach query which is how we want to pass the ingredients. we need to encode the ingredients into the search query.
    // const queryParams = [];
    // looping through all the properites in the ingredients.
    // for (let i in this.props.ings) {
    //   // encodeURIComponent IS A JS PROVIDED HELPER METHOD THAT ENCODES ELEMENTS SUCH THAT THEY CAN BE USED IN THE URL. we add a = sign becuase a key is = something in queryParams.
    //   // this pushs the property name (i)
    //   // this is an array that has a couple of strings: property name = propery value.  we now want to join that array of strings with the & sign.
    //   queryParams.push(encodeURIComponent(i) + '=' +
    //   // this sets the value for that property name [i].
    //    encodeURIComponent(this.props.ings[i]));
    // }
    // // //  WE NEED TO PASS THE TOTAL PROCE ALONG WITH THE INGEDIENTS TO THE CHECKOUT CONTAINER.
    // queryParams.push('price=' + this.props.totalPrice);
    // const queryString = queryParams.join('&');
    // once this is done we need to parse this info in the checkout component.
    this.props.history.push('/checkout');
  }


  // addIngredientHandler = (type) => {
  //   const oldCount = this.props.ings[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.props.ings
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  //   // this is where we updated the orderHandlerButton to refect the sum of values.  to show we are ordfering a burger.
  //   this.orderHandlerButton(updatedIngredients);
  // }
  //
  // removeIngredientHandler = (type) => {
  //   const oldCount = this.props.ings[type];
  //   {/*this prevents from further removing ingredients when you have no ingredients */}
  //   if(oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.props.ings
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  //   this.orderHandlerButton(updatedIngredients);
  // }
  // this disables the 'remove' button when there are no ingredients
  render () {
    const disabledRemoveButton = {
      ...this.props.ings
    };
    for (let key in disabledRemoveButton) {
      {/*this is saying { salad: true, meat: false}*/}
      disabledRemoveButton[key] = disabledRemoveButton[key] <= 0;
    }

    //THIS SECTION OF CODE CHECKS TO SEE IF WE HAVE INGREDIENTS BEFORE WE RENDER ANYTHING THAT DEPENDS ON THE INGREDIENTS. NOW THAT THE INGREDIENTS ARE ON THE DATABASE. AND STATE INGREDIENTS IS SET TO NULL, WE WILL GET AN ERROR WHEN MAPPING THROUGH THEM.  SO WE NEED TO SHOW A SPINNER WHILE INGREDIENTS LOAD.  BOTH SANDWICH AND OrderSummaryModal BOTH USE INGEDIENTS.
    let orderSummaryModal= null;
    let sandwich = this.props.error ? <p>Unable to load</p> : <Spinner />;

    if(this.props.ings) {
      sandwich = (
        <Aux>
          <Sandwich
            ingredients={this.props.ings} />
          <SandwichControls
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            disabledRemoveButton={disabledRemoveButton}
            price={this.props.totalPrice}
            orderButton={this.orderHandlerButton(this.props.ings)}
            ordered={this.purchaseHandler} />
        </Aux>
      );
      orderSummaryModal = <OrderSummaryModal
        ingredients={this.props.ings}
        cancelOrderHandler={this.cancelOrderHandler}
        continueOrderHandler={this.continueOrderHandler}
        price={this.props.totalPrice} />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} cancelPurchaseHander={this.cancelPurchaseHander}>
          {orderSummaryModal}
        </Modal>
        {sandwich}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.sandwichBuilderReducer.ingredients,
    totalPrice: state.sandwichBuilderReducer.totalPrice,
    error: state.sandwichBuilderReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingName) => dispatch(sandwichBuilderActions.addIngredient(ingName)),
    onRemoveIngredient: (ingName) => dispatch(sandwichBuilderActions.removeIngredient(ingName)),
    onInitialIngredients: () => dispatch(sandwichBuilderActions.initialIngredients())
  };
};

// we pass axios so that we can use interceptors in the ErrorHandler component. we essentially wrap axios with errorHandler component
export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(SandwichBuilder, axios));
