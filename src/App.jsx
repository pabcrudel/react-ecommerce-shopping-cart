import { products as mockProducts } from './mocks/products.json';
import { useEffect, useState } from 'react';
import Products from './components/Products';
import FiltersForm from './components/FiltersForm';
import { useFilters } from './hooks/useFilters';

export default function App () {
  const [products] = useState(mockProducts);
  const [categories, setCategories] = useState([]);
  const [maxPrices, setMaxPrices] = useState({ all: 0 });

  useEffect(
    () => {
      if (products.length) {
        const categories = new Set();
        let maxPrice;
        const maxPrices = {};

        for (const product of products) {
          const { category, price } = product;

          categories.add(category);

          if (!maxPrice || price > maxPrice) maxPrice = price;

          const categoryMaxPrice = maxPrices[category];
          if (!categoryMaxPrice || price > categoryMaxPrice) {
            maxPrices[category] = price;
          }
        }
        maxPrices.all = maxPrice;

        setCategories(Array.from(categories));
        setMaxPrices(maxPrices);
      }
    },
    [products]
  );

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
