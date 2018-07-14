import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Sandwich from '../../components/Sandwich/Sandwich';

class SandwichBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      ham: 0,
      cheese: 0,
      tomato: 0
    }
  }

  render () {
    return (
      <Aux>
        <Sandwich ingredients={this.state.ingredients}/>
        <div>Sandwich controls</div>
      </Aux>
    );
  }
}

export default SandwichBuilder;
