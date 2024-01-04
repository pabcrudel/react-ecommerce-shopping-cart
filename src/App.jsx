import Products from './components/Products';
import FiltersForm from './components/FiltersForm';
import Cart from './components/Cart';
import { useFilters } from './hooks/useFilters';
import { useProducts } from './hooks/useProducts';
import { CartProvider } from './contexts/cartContext';

export default function App () {
  const { products, categories, maxPrices } = useProducts();

  const { category, filterProducts } = useFilters();

  const filteredProducts = filterProducts(products);

  return (
    <>
      <header>
        <h1>React E-commerce Shopping Cart</h1>
      </header>

      <CartProvider>
        <main>
          <FiltersForm categories={categories} maxPrice={maxPrices[category]}/>
          <Products products={filteredProducts}/>
        </main>

        <aside>
          <Cart/>
        </aside>
      </CartProvider>
    </>
  );
}
