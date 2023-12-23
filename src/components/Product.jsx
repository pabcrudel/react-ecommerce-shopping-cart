import { AddToCartIcon } from './icons';
import PropTypes from 'prop-types';

export default function Product (
  { title, category, description, thumbnail, price }
) {
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

Product.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};
