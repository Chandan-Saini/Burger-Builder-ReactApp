import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import Aux from "../../hoc/Auxiliary"

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      bacon: 1,
      meat: 1,
      cheese: 2,
      salad: 2,
    },
  };
  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <div>burger controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder