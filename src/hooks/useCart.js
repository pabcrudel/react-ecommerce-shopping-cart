import { useContext } from 'react';
import { CartContext } from '../contexts/cartContext';

export function useCart () {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('"useCart" must be used within a "cartProvider"');
  }

  return cartContext;
}
