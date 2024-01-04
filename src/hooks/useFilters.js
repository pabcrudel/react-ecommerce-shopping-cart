import { useContext } from 'react';
import { FiltersContext } from '../contexts/filters';

export function useFilters () {
  const filtersContext = useContext(FiltersContext);

  if (!filtersContext) {
    throw new Error('"useFilters" must be used within a "FiltersProvider"');
  }

  const {
    category, setCategory, minPrice, setMinPrice
  } = filtersContext;

  const filterProducts = products => products.filter(product => (
    product.price >= minPrice && (
      category === 'all' || product.category === category
    )
  ));

  return { category, setCategory, minPrice, setMinPrice, filterProducts };
}
