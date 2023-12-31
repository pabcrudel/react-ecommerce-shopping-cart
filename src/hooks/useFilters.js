import { useContext } from 'react';
import { FiltersContext } from '../contexts/filters';

export function useFilters () {
  const {
    category, setCategory, minPrice, setMinPrice
  } = useContext(FiltersContext);

  const filterProducts = products => products.filter(product => (
    product.price >= minPrice && (
      category === 'all' || product.category === category
    )
  ));

  return { category, setCategory, minPrice, setMinPrice, filterProducts };
}
