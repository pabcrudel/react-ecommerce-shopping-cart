import { createContext } from 'react';
import PropTypes from 'prop-types';
import useCartReducer from '../reducers/cartReducer';

// 1 - Create the context
export const CartContext = createContext();

// 2 - Create the provider
export function CartProvider ({ children }) {
  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart
  } = useCartReducer();

  return (
    <CartContext.Provider value={
        {
          cart,
          addToCart,
          increaseQuantity,
          decreaseQuantity,
          removeFromCart,
          clearCart
        }
      }
    >
      { children }
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};
