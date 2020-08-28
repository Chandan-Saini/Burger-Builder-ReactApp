import * as actionTypes from './actions'

const initialState = {
  ingredients:{
      bacon: 0,
  meat: 0,
  cheese: 0,
  salad: 0
  },
  totalPrice: 50
};
 
const reducer=(state=initialState,action)=>{
    switch (action.actionTypes) {
        case actionTypes.ADD_INCREMENT:
              return{
                  ...state,
                  ingredients:{
                      ...state.ingredients,
                      [action.ingredientName]:state.ingredients[action.actionTypes] +1 
                  }
              }
        case actionTypes.REMOVE_INCREMENT:
              return{
                  ...state,
                  ingredients:{
                      ...state.ingredients,
                      [action.ingredientName]:state.ingredients[action.actionTypes] -1 
                  }
              }
         default:
               return state
    }
}

export default reducer