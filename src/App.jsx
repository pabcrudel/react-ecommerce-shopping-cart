import Products from './components/Products';
import FiltersForm from './components/FiltersForm';
import { useFilters } from './hooks/useFilters';
import { useProducts } from './hooks/useProducts';

export default function App () {
  const { products, categories, maxPrices } = useProducts();

  const { category, filterProducts } = useFilters();

  const filteredProducts = filterProducts(products);

  return (
    <>
      <header>
        <h1>React E-commerce Shopping Cart</h1>
      </header>

      <main>
        <FiltersForm categories={categories} maxPrice={maxPrices[category]}/>
        <Products products={filteredProducts}/>
      </main>
    </>
  );
}
