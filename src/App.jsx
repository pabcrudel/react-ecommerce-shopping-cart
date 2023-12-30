import { products as mockProducts } from './mocks/products.json';
import { useState } from 'react';
import Products from './components/Products';
import FiltersForm from './components/FiltersForm';
import { useFilters } from './hooks/useFilters';

export default function App () {
  const [products] = useState(mockProducts);

  const { filterProducts } = useFilters();

  const filteredProducts = filterProducts(products);

  return (
    <>
      <header>
        <h1>React E-commerce Shopping Cart</h1>
      </header>

      <main>
        <FiltersForm />
        <Products products={filteredProducts}/>
      </main>
    </>
  );
}
