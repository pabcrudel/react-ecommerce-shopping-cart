import { useState } from 'react';
import {
  RemoveFromCartIcon, ShoppingCartIcon, ClearCartIcon, DecreaseQuantityIcon,
  IncreaseQuantityIcon
} from './icons';
import { useCart } from '../hooks/useCart';
import PropTypes from 'prop-types';

export default function Cart () {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => setIsChecked(prevState => !prevState);

  const { cart, clearCart } = useCart();

  return (
    <div className='cart'>
      <header>
        <button onClick={handleClick}>
          <ShoppingCartIcon/>
        </button>
      </header>

      <main className={isChecked ? 'show' : 'hide'}>
        <section className='products'>
          <ul>
            {
              cart.map(product => (
                <li key={product.id}>
                  <CartItem product={product}/>
                </li>
              ))
            }
          </ul>
        </section>
        <footer>
          <button onClick={clearCart} disabled={!cart.length}>
            <ClearCartIcon/>
          </button>
        </footer>
      </main>
    </div>
  );
}

function CartItem ({ product }) {
  const { title, thumbnail, price, quantity, totalPrice, id } = product;

  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <section className='product'>
      <header>
        <img src={thumbnail} alt={title} crossOrigin='anonymous' />
      </header>

      <main>
        <h3>{title} - ${price}</h3>
        <section>
          <table>
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{quantity}</td>
                <td>${totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>

      <footer>
        <button onClick={() => increaseQuantity(id)}>
          <IncreaseQuantityIcon/>
        </button>
        <button onClick={() => decreaseQuantity(id)}>
          <DecreaseQuantityIcon/>
        </button>
        <button onClick={() => removeFromCart(id)}>
          <RemoveFromCartIcon/>
        </button>
      </footer>
    </section>
  );
}

const productTypes = PropTypes.shape(
  {
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired
  }
).isRequired;

CartItem.propTypes = {
  product: productTypes
};
