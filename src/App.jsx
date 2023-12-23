import { products as mockProducts } from './mocks/products.json';
import { useState } from 'react';
import Products from './components/Products';
import FiltersForm from './components/FiltersForm';

const INITIAL_FILTER = {
  category: 'all',
  minPrice: 0
};

export default function App () {
  const [products] = useState(mockProducts);

  const [filers, setFilters] = useState(INITIAL_FILTER);

  const filteredProducts = products.filter(product => (
    product.price >= filers.minPrice && (
      filers.category === 'all' || product.category === filers.category
    )
  ));

  function updateFilters (category, minPrice) {
    setFilters({ category, minPrice });
  }

  return (
    <>
      <header>
        <h1>React E-commerce Shopping Cart</h1>
      </header>

      <main>
        <FiltersForm
          initialCategory={filers.category}
          initialPrice={filers.minPrice}
          updateFilters={updateFilters}
        />
        <Products products={filteredProducts}/>
      </main>
    </>
  );
}
