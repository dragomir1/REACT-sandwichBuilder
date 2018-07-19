import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Sandwich from '../../components/Sandwich/Sandwich';
import SandwichControls from '../../components/Sandwich/SandwichControls/SandwichControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummaryModal from '../../components/Sandwich/OrderSummaryModal/OrderSummaryModal';

const INGREDIENT_PRICES = {
  salad: 0.75,
  ham: 1.0,
  tomato: 0.35,
  cheese: 0.75
};

class SandwichBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      tomato: 0,
      cheese: 0,
      ham: 0,
    },
    totalPrice: 4,
    ordered: false,
    // this will tell us if the order now button was clicked.
    purchasing: false
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
    this.setState({ordered: sum > 0});
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

  continueOrderHandler = () => {
    alert('continue');
  }
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    // this is where we updated the orderHandlerButton to refect the sum of values.  to show we are ordfering a burger.
    this.orderHandlerButton(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    {/*this prevents from further removing ingredients when you have no ingredients */}
    if(oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.orderHandlerButton(updatedIngredients);
  }
  // this disables the 'remove' button when there are no ingredients
  render () {
    const disabledRemoveButton = {
      ...this.state.ingredients
    };
    for (let key in disabledRemoveButton) {
      {/*this is saying { salad: true, meat: false}*/}
      disabledRemoveButton[key] = disabledRemoveButton[key] <= 0;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} cancelPurchaseHander={this.cancelPurchaseHander}>
          <OrderSummaryModal ingredients={this.state.ingredients}
            cancelOrderHandler={this.cancelOrderHandler}
            continueOrderHandler={this.continueOrderHandler}
            price={this.state.totalPrice} />
        </Modal>

        <Sandwich ingredients={this.state.ingredients}/>
        <SandwichControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledRemoveButton={disabledRemoveButton}
          price={this.state.totalPrice}
          orderButton={this.state.ordered}
          ordered={this.purchaseHandler} />
      </Aux>
    );
  }
}

export default SandwichBuilder;
