import { products as mockProducts } from '../mocks/products.json';
import { useEffect, useState } from 'react';

export function useProducts () {
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

  return { products, categories, maxPrices };
}
