import { useId, useState } from 'react';
import PropTypes from 'prop-types';

export default function FiltersForm (
  { initialPrice, initialCategory, updateFilters }
) {
  const [category, setCategory] = useState(initialCategory);
  const [minPrice, setMinPrice] = useState(initialPrice);
  const categoryFilterId = useId();
  const minPriceFilterId = useId();

  const handlePriceChanges = event => {
    const minPrice = Number.parseInt(event.target.value);

    setMinPrice(minPrice);
    updateFilters(category, minPrice);
  };

  const handleCategoryChanges = event => {
    const category = event.target.value;

    setCategory(category);
    updateFilters(category, minPrice);
  };

  return (
    <section className="filters">
      <h2 className='.centeredTitle'>Apply a filter</h2>

      <form className='center'>
        <div className="category">
          <label htmlFor={categoryFilterId}>Category</label>
          <select
            name="filterCategory"
            id={categoryFilterId}
            onChange={handleCategoryChanges}
          >
            <option value="all">All</option>
            <option value="laptops">Laptops</option>
          </select>
        </div>

        <div className="price">
          <label htmlFor={minPriceFilterId}>Minimum price: ${minPrice}</label>
          <input
            type="range"
            name="filterPrice"
            id={minPriceFilterId}
            min='0'
            max='1000'
            value={initialPrice}
            onChange={handlePriceChanges}
          />
        </div>
      </form>
    </section>
  );
}

FiltersForm.propTypes = {
  initialCategory: PropTypes.string.isRequired,
  initialPrice: PropTypes.number.isRequired,
  updateFilters: PropTypes.func.isRequired
};
