import PropTypes from 'prop-types';
import { AddToCartIcon } from './icons';

export default function Products ({ products }) {
  return (
    <section className='products'>
      <h2>Products</h2>

      <ul>
        {
          products.map(product => (
            <li key={product.id}>
              <Product product={product}/>
            </li>
          ))
        }
      </ul>
    </section>
  );
}

function Product ({ product }) {
  const { title, category, description, thumbnail, price } = product;

  return (
    <section className='product'>
      <header>
        <img src={thumbnail} alt={title} crossOrigin='anonymous'/>
      </header>

      <main>
        <h3>{title} - ${price}</h3>
        <p>{category}</p>
        <p>{description}</p>
      </main>

      <footer>
        <button>
          <AddToCartIcon />
        </button>
      </footer>
    </section>
  );
}

const productTypes = PropTypes.shape(
  {
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired
  }
).isRequired;

Products.propTypes = {
  products: PropTypes.arrayOf(productTypes).isRequired
};

Product.propTypes = {
  product: productTypes
};
