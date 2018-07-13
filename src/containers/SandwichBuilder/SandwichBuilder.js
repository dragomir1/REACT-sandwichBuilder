import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Sandwich from '../../components/Sandwich/Sandwich';

class SandwichBuilder extends Component {
  render () {
    return (
      <Aux>
        <Sandwich />
        <div>Sandwich controls</div>
      </Aux>
    );
  }
}

export default SandwichBuilder;
