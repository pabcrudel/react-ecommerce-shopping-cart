import { AddToCartIcon } from './icons';
import PropTypes from 'prop-types';

export default function Product ({ title, description, thumbnail, price }) {
  return (
    <section className='product'>
      <header>
        <img src={thumbnail} alt={title} />
      </header>

      <main>
        <h3>{title} - ${price}</h3>
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
  description: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};
