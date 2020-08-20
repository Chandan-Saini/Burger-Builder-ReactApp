import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import Aux from "../../hoc/Auxiliary"
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
  bacon: 20,
  meat: 30,
  cheese: 10,
  salad: 10
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice:50
  };

  addIngredientHandler=(type)=>{
       let oldCount=this.state.ingredients[type]
        const updatedCount=oldCount+1
        const updatedIngredients={...this.state.ingredients}
        updatedIngredients[type]=updatedCount
        
        const priceAddition=INGREDIENT_PRICES[type]
        const oldPrice=this.state.totalPrice
        const newPrice= oldPrice+priceAddition
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients})
  }

  removeIngredientHandler=(type)=>{
    let oldCount = this.state.ingredients[type]
    if (oldCount <= 0) {
      return
    }
    const updatedCount = oldCount - 1
    const updatedIngredients = { ...this.state.ingredients }
    updatedIngredients[type] = updatedCount

    const priceDeduction = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceDeduction
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
  }

  render() {
    const disabledInfo={
      ...this.state.ingredients
    }
    for(let key in disabledInfo){
      disabledInfo[key]=disabledInfo[key]<=0
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler}
        disabled={disabledInfo} />
      </Aux>
    );
  }
}

export default BurgerBuilder