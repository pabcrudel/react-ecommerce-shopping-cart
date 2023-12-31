import { useEffect, useId } from 'react';
import { useFilters } from '../hooks/useFilters';
import PropTypes from 'prop-types';

export default function FiltersForm ({ categories, maxPrice }) {
  return (
    <section className="filters">
      <h2>Apply a filter</h2>

      <form className='center'>
        <CategorySection categories={categories}/>
        <PriceSection maxPrice={maxPrice}/>
      </form>
    </section>
  );
}

function CategorySection ({ categories }) {
  const { setCategory } = useFilters();

  const categoryFilterId = useId();

  const handleCategoryChanges = event => {
    const category = event.target.value;

    setCategory(category);
  };

  return (
    <section className="category">
      <label htmlFor={categoryFilterId}>Category</label>
      <select
        name="filterCategory"
        id={categoryFilterId}
        onChange={handleCategoryChanges}
      >
        <option value="all">All</option>
        {
          categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))
        }
      </select>
    </section>
  );
}

function PriceSection ({ maxPrice }) {
  const { minPrice, setMinPrice } = useFilters();

  // Ensure that minPrice is equal or lower than maxPrice when this component is
  // rendered.
  useEffect(() => { if (minPrice > maxPrice) setMinPrice(maxPrice); });

  const minPriceFilterId = useId();

  const handlePriceChanges = event => {
    const minPrice = Number.parseInt(event.target.value);

    setMinPrice(minPrice);
  };

  return (
    <section className="price">
      <label htmlFor={minPriceFilterId}>
        Minimum price: ${minPrice}
      </label>
      <input
        type="range"
        name="filterPrice"
        id={minPriceFilterId}
        min='0'
        max={maxPrice}
        value={minPrice}
        onChange={handlePriceChanges}
      />
    </section>
  );
}

const categoryProps = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired
};
const priceProps = { maxPrice: PropTypes.number.isRequired };

FiltersForm.propTypes = { ...categoryProps, ...priceProps };
CategorySection.propTypes = categoryProps;
PriceSection.propTypes = priceProps;
