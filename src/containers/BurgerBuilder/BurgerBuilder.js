import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import Aux from "../../hoc/Auxiliary/Auxiliary"
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'


class BurgerBuilder extends Component {
  state = {
    purchasable:false,
    purchasing:false,
    loading:false,
    error:false
  };

  componentWillMount(){
    // axios.get("https://burger-builder23.firebaseio.com/ingredients.json").then(response=>{
    //    this.setState({ingredients:response.data})
    // }).catch(error=>{
    //     this.setState({error:true})
    // })
  }

  updatePurchaseState=(ingredients)=>{
    const sum=Object.keys(ingredients).map(igKey=>{
      return ingredients[igKey]
    }).reduce((sum,el)=>{
      return sum+el
    },0)
    this.setState({purchasable:sum>0})
  }

purchaseHandler=()=>{
  this.setState({purchasing:true})
}
  
purchaseCancelHandler=()=>{
  this.setState({purchasing:false})
}

purchaseContinueHandler=()=>{
  const queryParams=[]
  for (let i in this.state.ingredients) {
    queryParams.push(
      encodeURIComponent(i) +
        "=" +
        encodeURIComponent(this.state.ingredients[i])
    );
  }

  queryParams.push("price=" + this.props.price);
   const queryString = queryParams.join('&')

  this.props.history.push({pathname:"/checkout",
search:'?' + queryString})
}

  render() {

    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary=null
            let burger = this.state.error ? (
              <p>Ingredients can't be loaded!</p>
            ) : (
              <Spinner />
            );
    
    if (this.props.ings) {
        burger = (
          <Aux>
            <Burger ingredients={this.props.ings} />
            <BuildControls
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disabled={disabledInfo}
              price={this.props.price}
              purchasable={this.state.purchasable}
              ordered={this.purchaseHandler}
            />
          </Aux>
        );

        orderSummary = (
          <OrderSummary
            ingredients={this.props.ings}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.props.price}
          />
        );
    }

     if (this.state.loading) {
       orderSummary = <Spinner />;
     }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} > 
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps=state=>{
   return {
     ings: state.ingredients,
     price:state.totalPrice
   }
}

const mapDispatchToProps=dispatch=>{ 
   return {
     onIngredientAdded:(ingName)=>dispatch({ type: "ADD_INGREDIENT", ingredientName:ingName}),
   onIngredientRemoved:(ingName)=>dispatch({ type: "REMOVE_INGREDIENT", ingredientName:ingName})
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder,axios));