import { useId } from 'react';
import { useFilters } from '../hooks/useFilters';

export default function FiltersForm () {
  return (
    <section className="filters">
      <h2>Apply a filter</h2>

      <form className='center'>
        <CategorySection/>
        <PriceSection/>
      </form>
    </section>
  );
}

function CategorySection () {
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
        <option value="laptops">Laptops</option>
      </select>
    </section>
  );
}

function PriceSection () {
  const { minPrice, setMinPrice } = useFilters();

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
        max='1000'
        value={minPrice}
        onChange={handlePriceChanges}
      />
    </section>
  );
}
