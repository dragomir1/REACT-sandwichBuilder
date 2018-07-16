import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Sandwich from '../../components/Sandwich/Sandwich';
import SandwichControls from '../../components/Sandwich/SandwichControls/SandwichControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  ham: 1.0,
  tomato: 0.5,
  cheese: 0.75
};

class SandwichBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      ham: 0,
      cheese: 0,
      tomato: 0
    },
    totalPrice: 4
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
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  }
  // this disables the 'remove' button when there are no ingredients
  render () {
    const disabledRemoveButton = {
      ...this.state.ingredients
    };
    for (let key in disabledRemoveButton) {
      disabledRemoveButton[key] = disabledRemoveButton[key] <= 0;
    }

    return (
      <Aux>
        <Sandwich ingredients={this.state.ingredients}/>
        <SandwichControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledRemoveButton={disabledRemoveButton} />
      </Aux>
    );
  }
}

export default SandwichBuilder;
