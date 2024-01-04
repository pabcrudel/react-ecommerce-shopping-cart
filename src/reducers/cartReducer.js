import { useReducer } from 'react';

export default function useCartReducer () {
  const [cart, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  const addToCart = product => dispatch({
    type: CART_ACTIONS.ADD,
    payload: product
  });

  const increaseQuantity = id => dispatch({
    type: CART_ACTIONS.INCREASE_QTY,
    payload: id
  });

  const decreaseQuantity = id => dispatch({
    type: CART_ACTIONS.DECREASE_QTY,
    payload: id
  });

  const removeFromCart = id => dispatch({
    type: CART_ACTIONS.REMOVE,
    payload: id
  });

  const clearCart = () => dispatch({ type: CART_ACTIONS.CLEAR });

  return {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart
  };
}

// useReducer initial state
const CART_INITIAL_STATE = [];

// Manage actions
const CART_ACTIONS = {
  ADD: 0,
  REMOVE: 1,
  INCREASE_QTY: 2,
  DECREASE_QTY: 3,
  CLEAR: 4
};

// Create the reducer
function cartReducer (cart, action) {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTIONS.ADD: {
      // payload === product

      const { id } = payload;
      const index = cart.findIndex(item => item.id === id);
      if (index !== -1) return modifyQuantity(cart, index, 'ADD');

      return [
        ...cart,
        {
          ...payload,
          quantity: 1,
          totalPrice: payload.price
        }
      ];
    }

    case CART_ACTIONS.REMOVE: {
      // payload === id

      return removeProductById(cart, payload);
    }

    case CART_ACTIONS.INCREASE_QTY: {
      // payload === id

      const index = cart.findIndex(item => item.id === payload);
      if (index === -1) return null;

      return modifyQuantity(cart, index, 'ADD');
    }

    case CART_ACTIONS.DECREASE_QTY: {
      // payload === id

      const index = cart.findIndex(item => item.id === payload);
      if (index === -1) return null;

      if (cart[index].quantity === 1) return removeProductById(cart, payload);
      else return modifyQuantity(cart, index, 'SUB');
    }

    case CART_ACTIONS.CLEAR: return CART_INITIAL_STATE;

    default:
      throw new Error(type + ' Is an invalid cart reducer action');
  }
}

function removeProductById (cart, id) {
  return cart.filter(product => product.id !== id);
}

function modifyQuantity (cart, index, action) {
  const firstProducts = cart.slice(0, index);
  const lastProducts = cart.slice(index + 1);
  const product = structuredClone(cart[index]);

  switch (action) {
    case 'ADD':
      product.quantity++;
      product.totalPrice += product.price;
      break;

    case 'SUB':
      product.quantity--;
      product.totalPrice -= product.price;
      break;

    default:
      throw new Error(action + ' Is an invalid modify cart action');
  }

  return [...firstProducts, product, ...lastProducts];
}
