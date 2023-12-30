import { useId } from 'react';
import { useFilters } from '../hooks/useFilters';

export default function FiltersForm () {
  const { setCategory, minPrice, setMinPrice } = useFilters();

  const categoryFilterId = useId();
  const minPriceFilterId = useId();

  const handlePriceChanges = event => {
    const minPrice = Number.parseInt(event.target.value);

    setMinPrice(minPrice);
  };

  const handleCategoryChanges = event => {
    const category = event.target.value;

    setCategory(category);
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
          <label htmlFor={minPriceFilterId}>
            Minimum price: ${minPrice}
          </label>
          <input
            type="range"
            name="filterPrice"
            id={minPriceFilterId}
            min='0'
            max='1000'
            value={minPrice}
            onChange={handlePriceChanges}
          />
        </div>
      </form>
    </section>
  );
}
