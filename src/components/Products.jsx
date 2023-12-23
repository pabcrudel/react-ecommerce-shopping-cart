import PropTypes from 'prop-types';
import Product from './Product';

export default function Products ({ products }) {
  return (
    <ul className='products'>
      {
        products.map(products => (
          <li key={products.id}>
            <Product
              title={products.title}
              description={products.description}
              price={products.price}
              thumbnail={products.thumbnail}
            />
          </li>
        ))
      }
    </ul>
  );
}

Products.propTypes = {
  products: PropTypes.array.isRequired
};
