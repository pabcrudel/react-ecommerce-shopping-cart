import PropTypes from 'prop-types';
import Product from './Product';

export default function Products ({ products }) {
  return (
    <section className='products'>
      <h2>Products</h2>

      <ul>
        {
          products.map(products => (
            <li key={products.id}>
              <Product
                title={products.title}
                category={products.category}
                description={products.description}
                price={products.price}
                thumbnail={products.thumbnail}
              />
            </li>
          ))
        }
      </ul>
    </section>
  );
}

Products.propTypes = {
  products: PropTypes.array.isRequired
};
